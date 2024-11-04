import { plainToClass } from 'class-transformer';
import { injectable, inject } from 'tsyringe';
import { IBorrowService } from '../interfaces/IBorrowRecordService';
import { BorrowRecord } from '../entities/BorrowRecord';
import { IBorrowRecordRepository } from '../interfaces/IBorrowRecordRepository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IBookRepository } from '../interfaces/IBookRepository';

@injectable()
export class BorrowService implements IBorrowService {
    constructor(
        @inject('IBorrowRecordRepository') private readonly borrowRecordRepository: IBorrowRecordRepository,
        @inject('IUserRepository') private readonly userRepository: IUserRepository,
        @inject('IBookRepository') private readonly bookRepository: IBookRepository
    ) { }

    async returnBook(userId: number, bookId: number, score: number): Promise<void> {
        const borrowRecord = await this.borrowRecordRepository.findActiveRecord(userId, bookId);

        if (!borrowRecord) throw new Error('Active borrow record not found');

        borrowRecord.returned_at = new Date();
        borrowRecord.rating = score;

        await this.borrowRecordRepository.update(borrowRecord);

        const book = await this.bookRepository.findDetailsById(bookId, ['borrowRecords']);

        if (book) {
            const validRatings = book.borrowRecords
                ?.filter(record => record.returned_at !== null && record.rating !== null)
                .map(record => record.rating!) ?? [];

            if (validRatings.length > 0) {
                const totalScore = validRatings.reduce((sum, rating) => sum + rating, 0);
                const newAverageScore = totalScore / validRatings.length;
                book.score = newAverageScore;
            } else {
                book.score = score;
            }
            console.log('Updating book with score:', book.score);
            await this.bookRepository.update(book);
            console.log('Book updated');
        }
    }

    async borrowBook(userId: number, bookId: number): Promise<void> {
        const user = await this.userRepository.findById(userId);
        const book = await this.bookRepository.findDetailsById(bookId, ['borrowRecords']);

        if (!user) throw new Error('User not found');
        if (!book) throw new Error('Book not found');
        if (book.borrowRecords?.some(record => record.returned_at === null)) {
            throw new Error('Book is currently borrowed and cannot be borrowed again until returned.');
        }

        const newBorrowRecord = plainToClass(BorrowRecord, { user, book, borrowed_at: new Date() });

        await this.borrowRecordRepository.create(newBorrowRecord);
    }
}
