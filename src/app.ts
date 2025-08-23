import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/book.controller";
import { borrowBookRoutes } from "./app/controllers/borrowBook.controller";

const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowBookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management System Running !!");
});

export default app;
