import express, { Request, Response } from "express";
import { BorrowBook } from "../models/borrowBook.model";

export const borrowBookRoutes = express.Router();

borrowBookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const borrowBook = await BorrowBook.create(body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBook,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});
borrowBookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const borrowedBooksSummary = await BorrowBook.find().populate("book");

    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrived successfully",
      data: borrowedBooksSummary,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});
