import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRoutes = express.Router();

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const createBook = await Book.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: createBook,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      succees: false,
      message: error.message,
      error: error,
    });
  }
});
booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    const allBooks = await Book.find(filter ? { genre: filter } : {})
      .sort(sortBy ? { [sortBy as string]: sort === "asc" ? 1 : -1 } : {})
      .limit(limit ? parseInt(limit as string) : 10);
    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: allBooks,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      succees: false,
      message: error.message,
      error: error,
    });
  }
});
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const singleBook = await Book.findById(bookId);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: singleBook,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      succees: false,
      message: error.message,
      error: error,
    });
  }
});

booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateBody = req.body;

    const updateBook = await Book.findByIdAndUpdate(bookId, updateBody, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data: updateBook,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      succees: false,
      message: error.message,
      error: error,
    });
  }
});

booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const deleteBook = await Book.findByIdAndDelete(bookId);
    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      data: deleteBook,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      succees: false,
      message: error.message,
      error: error,
    });
  }
});
