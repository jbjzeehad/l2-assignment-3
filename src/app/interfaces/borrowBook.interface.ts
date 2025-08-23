import { Types } from "mongoose";

export interface IBorrowbook {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
