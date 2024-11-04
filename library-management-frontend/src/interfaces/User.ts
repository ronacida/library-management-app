import { BookDTO } from "./Book";

export interface BorrowRecordDTO {
    id: number;
    userId: number;
    bookId: number;
    book?: BookDTO;
    borrowed_at: Date;
    returned_at?: Date | null;
    rating?: number | null;
}

export interface UserDetails {
    user: UserDTO;
    books: {
        current: BorrowRecordDTO[];
        past: BorrowRecordDTO[];
    };
}

export interface UserDTO {
    id: number;
    name: string;
    borrowRecords?: BorrowRecordDTO[];
}