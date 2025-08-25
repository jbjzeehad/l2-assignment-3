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
exports.borrowSummary = exports.borrowBook = void 0;
const books_model_1 = require("../models/books.model");
const borrowBook_model_1 = require("../models/borrowBook.model");
//---------> borrow a book
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const borrowBookId = yield books_model_1.Books.findById({ _id: body.book });
        if (borrowBookId === null) {
            return res.status(404).json({
                success: false,
                message: "Invalid book id",
            });
        }
        else if (!body.quantity || !body.dueDate) {
            return res.status(404).json({
                success: false,
                message: "quantity must be positive integer and date must be valid",
            });
        }
        else if (!((borrowBookId === null || borrowBookId === void 0 ? void 0 : borrowBookId.copies) > 0)) {
            return res.status(404).json({
                success: false,
                message: "Book copies are not available for borrow",
            });
        }
        const isAvailable = yield borrowBook_model_1.BorrowBook.isAvailable(body.book, body.quantity);
        if (isAvailable) {
            const borrow = yield borrowBook_model_1.BorrowBook.create(body);
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrow,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Not enough copies.",
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
exports.borrowBook = borrowBook;
// -------> borrowed book summary
const borrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBooks = yield borrowBook_model_1.BorrowBook.aggregate([
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
        }
        else {
            res.status(404).json({
                success: false,
                message: "No borrowed books",
                data: null,
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
exports.borrowSummary = borrowSummary;
