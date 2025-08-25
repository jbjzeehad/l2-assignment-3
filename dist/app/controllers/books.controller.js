"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.singleBook = exports.allBooks = exports.createBook = void 0;
const books_model_1 = require("../models/books.model");
// ---------> create book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const createBook = yield books_model_1.Books.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: createBook,
        });
    }
    catch (error) {
        res.status(404).json({
            succees: false,
            message: "Validation failed",
            error: error,
        });
    }
});
exports.createBook = createBook;
// -------------> all books
const allBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const allBooks = yield books_model_1.Books.find(filter ? { genre: filter } : {})
            .sort(sortBy ? { [sortBy]: sort === "asc" ? 1 : -1 } : {})
            .limit(limit ? parseInt(limit) : 10);
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: allBooks,
        });
    }
    catch (error) {
        res.status(404).json({
            succees: false,
            message: error.message,
            error: error,
        });
    }
});
exports.allBooks = allBooks;
// -------------> single book
const singleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const isValidBookId = yield books_model_1.Books.findById({ _id: bookId });
        let singleBook;
        if (isValidBookId) {
            singleBook = yield books_model_1.Books.findById(bookId);
            res.status(201).json({
                success: true,
                message: "Book retrieved successfully",
                data: singleBook,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Invalid BookId",
                error: bookId,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
exports.singleBook = singleBook;
// -------------> update book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateBody = req.body;
        const isValidBookId = yield books_model_1.Books.findById({ _id: bookId });
        if (!isValidBookId) {
            return res.status(404).json({
                success: false,
                message: "Invalid BookId",
                data: bookId,
            });
        }
        let updateSingleBook;
        if (updateBody.copies !== undefined) {
            updateSingleBook = yield books_model_1.Books.updateCopies(bookId, updateBody.copies);
            const otherFields = Object.assign({}, updateBody);
            delete otherFields.copies;
            if (Object.keys(otherFields).length > 0) {
                updateSingleBook = yield books_model_1.Books.findByIdAndUpdate(bookId, otherFields, {
                    new: true,
                });
            }
        }
        else {
            updateSingleBook = yield books_model_1.Books.findByIdAndUpdate(bookId, updateBody, {
                new: true,
            });
        }
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updateSingleBook,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
exports.updateBook = updateBook;
// --------> delete book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const isValidBookId = yield books_model_1.Books.findById({ _id: bookId });
        let deleteBook;
        if (isValidBookId) {
            deleteBook = yield books_model_1.Books.findOneAndDelete({ _id: bookId });
            res.status(201).json({
                success: true,
                message: "Book deleted successfully",
                data: null,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Invalid BookId",
                data: { bookId },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
exports.deleteBook = deleteBook;
