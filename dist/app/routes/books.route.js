"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controllers/books.controller");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post("/api/books", books_controller_1.createBook);
exports.booksRoutes.get("/api/books", books_controller_1.allBooks);
exports.booksRoutes.get("/api/books/:bookId", books_controller_1.singleBook);
exports.booksRoutes.put("/api/books/:bookId", books_controller_1.updateBook);
exports.booksRoutes.delete("/api/books/:bookId", books_controller_1.deleteBook);
