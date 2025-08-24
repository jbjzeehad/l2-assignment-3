import express from "express";
import {
  borrowBook,
  borrowSummary,
} from "../controllers/borrowBook.controller";

export const borrowBookRoutes = express.Router();

borrowBookRoutes.post("/api/borrow", borrowBook);
borrowBookRoutes.get("/api/borrow", borrowSummary);
