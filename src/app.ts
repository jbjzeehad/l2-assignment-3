import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/book.controller";

const app: Application = express();

app.use(express.json());

app.use("/books", booksRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management System Running !!");
});

export default app;
