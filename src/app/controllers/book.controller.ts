import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRoutes = express.Router();

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      succees: false,
      message: error.message,
      error,
    });
  }
});
booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      succees: false,
      message: error.message,
      error,
    });
  }
});
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      succees: false,
      message: error.message,
      error,
    });
  }
});
