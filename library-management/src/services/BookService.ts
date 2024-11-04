import { injectable } from 'tsyringe';
import { IBookService } from '../interfaces/IBookService';
import { BookRepository } from '../repositories/BookRepository';
import { BookDTO } from '../dtos/BookDTO';
import { plainToClass } from 'class-transformer';
import { Book } from '../entities/Book';
import { BorrowRecord } from '../entities/BorrowRecord';

@injectable()
export class BookService implements IBookService {
  constructor(private readonly bookRepository: BookRepository) { }

  async getAllBooks(): Promise<{ id: number; name: string }[]> {
    const books = await this.bookRepository.findAll();
    return books.map(book => ({ id: book.id, name: book.name }));
  }

  async getBookDetails(bookId: number): Promise<BookDTO> {
    const book = await this.bookRepository.findDetailsById(bookId, ['borrowRecords', 'borrowRecords.user']);
    if (!book) throw new Error('Book not found');

    const { borrowRecords, ...bookWithoutRecords } = book;

    if (!borrowRecords) {
      return plainToClass(BookDTO, bookWithoutRecords);
    }

    const ratings = borrowRecords.filter(record => record.rating !== null).map(record => record.rating!) ?? [];
    const averageScore = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : -1;

    const currentBorrowRecord = borrowRecords.find(record => record.returned_at === null);
    const currentUser = currentBorrowRecord ? currentBorrowRecord.user : null;

    const bookDTO = plainToClass(BookDTO, bookWithoutRecords);
    bookDTO.score = averageScore;
    bookDTO.currentOwner = currentUser ? { id: currentUser.id, name: currentUser.name } : null;

    return bookDTO;
  }

  async createBook(bookData: BookDTO): Promise<BookDTO> {
    const newBook = plainToClass(Book, bookData);
    const savedBook = await this.bookRepository.create(newBook);
    return plainToClass(BookDTO, savedBook);
  }

  async updateBook(bookId: number, bookData: Partial<BookDTO>): Promise<BookDTO> {
    const existingBook = await this.bookRepository.findById(bookId);
    if (!existingBook) throw new Error('Book not found');

    const updatedBook = plainToClass(Book, {
      ...existingBook,
      ...bookData,
      borrowRecords: bookData.borrowRecords?.map(record => plainToClass(BorrowRecord, record)) ?? existingBook.borrowRecords,
    });

    const savedBook = await this.bookRepository.update(updatedBook);
    return plainToClass(BookDTO, savedBook);
  }
}