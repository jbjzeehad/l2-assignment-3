import express from "express";
import {
  allBooks,
  createBook,
  deleteBook,
  singleBook,
  updateBook,
} from "../controllers/books.controller";

export const booksRoutes = express.Router();

booksRoutes.post("api/books", createBook);
booksRoutes.get("api/books/:bookId", allBooks);
booksRoutes.get("api/books/:bookId", singleBook);
booksRoutes.patch("api/books/:bookId", updateBook);
booksRoutes.delete("api/books/:bookId", deleteBook);
