"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const books_route_1 = require("./app/routes/books.route");
const borrowBook_route_1 = require("./app/routes/borrowBook.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(books_route_1.booksRoutes);
app.use(borrowBook_route_1.borrowBookRoutes);
app.get("/", (req, res) => {
    res.send("Library Management System");
});
exports.default = app;
