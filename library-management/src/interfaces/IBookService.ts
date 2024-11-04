import { BookDTO } from '../dtos/BookDTO';

export interface IBookService {
  getAllBooks(): Promise<BookDTO[]>;
  getBookDetails(bookId: number): Promise<BookDTO>;
  createBook(bookData: BookDTO): Promise<BookDTO>;
  updateBook(bookId: number, bookData: Partial<BookDTO>): Promise<BookDTO>;
}
