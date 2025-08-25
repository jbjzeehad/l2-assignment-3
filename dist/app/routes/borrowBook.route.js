"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrowBook_controller_1 = require("../controllers/borrowBook.controller");
exports.borrowBookRoutes = express_1.default.Router();
exports.borrowBookRoutes.post("/api/borrow", borrowBook_controller_1.borrowBook);
exports.borrowBookRoutes.get("/api/borrow", borrowBook_controller_1.borrowSummary);
