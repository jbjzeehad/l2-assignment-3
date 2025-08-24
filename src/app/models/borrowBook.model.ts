import { model, Schema } from "mongoose";
import {
  BorrowBookSMethod,
  IBorrowbook,
} from "../interfaces/borrowBook.interface";
import { Books } from "./books.model";

const borrowBookSchema = new Schema<IBorrowbook, BorrowBookSMethod>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "IBook",
      required: [true, "The borrowed books ID"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be a positive integer number"],
    },
    dueDate: {
      type: Date,
      required: [true, "Date must be given"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowBookSchema.static("isAvailable", async function (book, quantity) {
  const borrowedBookId = await Books.findById({ _id: book });
  const borrowedBookQuantity: any = borrowedBookId?.copies;
  let remainingBook = borrowedBookQuantity - quantity;
  if (remainingBook >= 0) {
    return true;
  } else {
    return false;
  }
});

borrowBookSchema.post("save", async function (doc, next) {
  try {
    const borrowedBookId: any = await Books.findById({ _id: doc.book });
    let remainingBook = borrowedBookId?.copies - doc.quantity;
    if (remainingBook > 0) {
      await Books.findByIdAndUpdate(
        borrowedBookId,
        {
          $set: {
            copies: remainingBook,
          },
        },
        { new: true }
      );
    } else if (remainingBook == 0) {
      await Books.findByIdAndUpdate(
        borrowedBookId,
        {
          $set: {
            copies: remainingBook,
            available: false,
          },
        },
        { new: true }
      );
    }
    next();
  } catch (error: any) {
    next(error);
    error;
  }
});

export const BorrowBook = model<IBorrowbook, BorrowBookSMethod>(
  "BorrowBook",
  borrowBookSchema
);
