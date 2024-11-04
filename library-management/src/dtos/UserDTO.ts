import { BorrowRecordDTO } from "./BorrowRecordDTO";

export class UserDTO {
    id!: number;
    name!: string;
    borrowRecords?: BorrowRecordDTO[];
}
