export class BorrowRecordDTO {
    id!: number;
    userId!: number;
    bookId!: number;
    borrowed_at!: Date;
    returned_at?: Date | null;
    rating?: number | null;
}