import { BorrowRecordDTO } from './BorrowRecordDTO';

export class BookDTO {
    id!: number;
    name!: string;
    score?: number | null;
    borrowRecords?: BorrowRecordDTO[];
    currentOwner?: { id: number; name: string } | null;
}
