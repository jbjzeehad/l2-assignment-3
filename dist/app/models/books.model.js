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
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const borrowBook_model_1 = require("./borrowBook.model");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
    },
    genre: {
        type: String,
        uppercase: true,
        required: true,
        trim: true,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "Must be on of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY .",
        },
    },
    isbn: {
        type: String,
        unique: true,
        required: [true, "Should be unique"],
        trim: true,
    },
    description: { type: String, trim: true },
    copies: {
        type: Number,
        min: [0, "Copies must be a positive number"],
        required: true,
    },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield borrowBook_model_1.BorrowBook.deleteMany({ book: doc._id });
        }
        next();
    });
});
bookSchema.statics.updateCopies = function (bookId, copies) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findByIdAndUpdate(bookId, { copies, available: copies > 0 }, { new: true });
    });
};
exports.Books = (0, mongoose_1.model)("Books", bookSchema);
