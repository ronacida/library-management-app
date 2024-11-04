import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IBookService } from '../interfaces/IBookService';
import { BookDTO } from '../dtos/BookDTO';

@injectable()
export class BookController {
    constructor(@inject('IBookService') private readonly bookService: IBookService) { }

    async getBooks(req: Request, res: Response): Promise<Response> {
        try {
            const books = await this.bookService.getAllBooks();
            const response = books.map(book => ({
                id: book.id,
                name: book.name
            }));
            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getBookDetails(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = parseInt(req.params.id);
            const bookDetails = await this.bookService.getBookDetails(bookId);

            return res.status(200).json(bookDetails);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }

    async createBook(req: Request, res: Response): Promise<Response<BookDTO>> {
        try {
            const bookData = req.body;
            const newBook = await this.bookService.createBook(bookData);
            return res.status(201).json(newBook);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async updateBook(req: Request, res: Response): Promise<Response<void>> {
        try {
            const bookId = parseInt(req.params.id);
            const bookData = req.body;
            const updatedBook = await this.bookService.updateBook(bookId, bookData);
            return res.status(200).json(updatedBook);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
}