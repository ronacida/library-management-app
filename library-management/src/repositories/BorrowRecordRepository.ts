// BorrowRecordRepository.ts
import { injectable, inject } from 'tsyringe';
import { BaseRepository } from './BaseRepository';
import { BorrowRecord } from '../entities/BorrowRecord';
import { DataSource, IsNull } from 'typeorm';
import { IBorrowRecordRepository } from '../interfaces/IBorrowRecordRepository';

@injectable()
export class BorrowRecordRepository extends BaseRepository<BorrowRecord> implements IBorrowRecordRepository {
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(BorrowRecord, dataSource);
  }

  async findActiveRecord(userId: number, bookId: number): Promise<BorrowRecord | null> {
    return this.getRepository().findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
        returned_at: IsNull(),
      },
      relations: ['user', 'book'],
    });
  }
}
