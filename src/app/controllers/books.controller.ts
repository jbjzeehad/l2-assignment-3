import { Request, Response } from "express";
import { Books } from "../models/books.model";

// ---------> create book

export const createBook = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const createBook = await Books.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: createBook,
    });
  } catch (error: any) {
    res.status(404).json({
      succees: false,
      message: "Validation failed",
      error: error,
    });
  }
};

// -------------> all books

export const allBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    const allBooks = await Books.find(filter ? { genre: filter } : {})
      .sort(sortBy ? { [sortBy as string]: sort === "asc" ? 1 : -1 } : {})
      .limit(limit ? parseInt(limit as string) : 10);
    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: allBooks,
    });
  } catch (error: any) {
    res.status(404).json({
      succees: false,
      message: error.message,
      error: error,
    });
  }
};

// -------------> single book

export const singleBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const isValidBookId = await Books.findById({ _id: bookId });
    let singleBook;
    if (isValidBookId) {
      singleBook = await Books.findById(bookId);
      res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: singleBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Invalid BookId",
        error: bookId,
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

// -------------> update book

export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const isValidBookId = await Books.findById({ _id: bookId });
    let updateBook;
    if (isValidBookId) {
      const updateBody = req.body;
      updateBook = await Books.findByIdAndUpdate(bookId, updateBody, {
        new: true,
      });
      res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: updateBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Invalid BookId",
        data: bookId,
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

// --------> delete book

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const isValidBookId = await Books.findById({ _id: bookId });
    let deleteBook;
    if (isValidBookId) {
      deleteBook = await Books.findOneAndDelete({ _id: bookId });
      res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Invalid BookId",
        data: { bookId },
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
