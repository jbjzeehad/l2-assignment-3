import { model, Schema } from "mongoose";
import { IBorrowbook } from "../interfaces/borrowBook.interface";

const borrowBookSchema = new Schema<IBorrowbook>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "The borrowed books ID"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity must be a positive number"],
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

export const BorrowBook = model("BorrowBook", borrowBookSchema);
