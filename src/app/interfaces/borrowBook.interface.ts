import { Date, Model, ObjectId } from "mongoose";

export interface IBorrowbook {
  book: ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface BorrowBookSMethod extends Model<IBorrowbook> {
  isAvailable(book: ObjectId, quantity: number): boolean;
}
