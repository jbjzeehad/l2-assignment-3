import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
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
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Must be on of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY .",
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model("Book", bookSchema);
