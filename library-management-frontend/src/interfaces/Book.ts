import { BorrowRecordDTO } from "./User";

// interfaces/Book.ts
export interface BookDTO {
  id: number;
  name: string;
  score?: number | null;
  borrowRecords?: BorrowRecordDTO[];
  currentOwner?: { id: number; name: string } | null;
}