import { Request, Response } from "express";
import { Books } from "../models/books.model";
import { BorrowBook } from "../models/borrowBook.model";

//---------> borrow a book

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const borrowBookId: any = await Books.findById({ _id: body.book });
    if (borrowBookId === null) {
      return res.status(404).json({
        success: false,
        message: "Invalid book id",
      });
    } else if (!body.quantity || !body.dueDate) {
      return res.status(404).json({
        success: false,
        message: "quantity must be positive integer and date must be valid",
      });
    } else if (!(borrowBookId?.copies > 0)) {
      return res.status(404).json({
        success: false,
        message: "Book copies are not available for borrow",
      });
    }

    const isAvailable = await BorrowBook.isAvailable(body.book, body.quantity);

    if (isAvailable) {
      const borrow = await BorrowBook.create(body);
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "no enough copies",
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// -------> borrowed book summary

export const borrowSummary = async (req: Request, res: Response) => {
  try {
    const borrowedBooks = await BorrowBook.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    if (borrowedBooks.length > 0) {
      res.status(201).json({
        success: true,
        message: "Borrowed books summary retrived successfully",
        data: borrowedBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No borrowed books",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
