import { IBaseRepository } from './IBaseRepository';
import { BorrowRecord } from '../entities/BorrowRecord';

export interface IBorrowRecordRepository extends IBaseRepository<BorrowRecord> {
    findActiveRecord(userId: number, bookId: number): Promise<BorrowRecord | null>;
}
