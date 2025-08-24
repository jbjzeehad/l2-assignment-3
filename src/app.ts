import cors from "cors";
import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/routes/books.route";
import { borrowBookRoutes } from "./app/routes/borrowBook.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(booksRoutes);
app.use(borrowBookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management System");
});

export default app;
