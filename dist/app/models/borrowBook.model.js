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
exports.BorrowBook = void 0;
const mongoose_1 = require("mongoose");
const books_model_1 = require("./books.model");
const borrowBookSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "IBook",
        required: [true, "The borrowed books ID"],
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be a positive integer number"],
    },
    dueDate: {
        type: Date,
        required: [true, "Date must be given"],
    },
}, {
    versionKey: false,
    timestamps: true,
});
borrowBookSchema.static("isAvailable", function (book, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const borrowedBookId = yield books_model_1.Books.findById({ _id: book });
        const borrowedBookQuantity = borrowedBookId === null || borrowedBookId === void 0 ? void 0 : borrowedBookId.copies;
        let remainingBook = borrowedBookQuantity - quantity;
        if (remainingBook >= 0) {
            return true;
        }
        else {
            return false;
        }
    });
});
borrowBookSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const borrowedBookId = yield books_model_1.Books.findById({ _id: doc.book });
            let remainingBook = (borrowedBookId === null || borrowedBookId === void 0 ? void 0 : borrowedBookId.copies) - doc.quantity;
            if (remainingBook > 0) {
                yield books_model_1.Books.findByIdAndUpdate(borrowedBookId, {
                    $set: {
                        copies: remainingBook,
                    },
                }, { new: true });
            }
            else if (remainingBook == 0) {
                yield books_model_1.Books.findByIdAndUpdate(borrowedBookId, {
                    $set: {
                        copies: remainingBook,
                        available: false,
                    },
                }, { new: true });
            }
            next();
        }
        catch (error) {
            next(error);
            error;
        }
    });
});
exports.BorrowBook = (0, mongoose_1.model)("BorrowBook", borrowBookSchema);
