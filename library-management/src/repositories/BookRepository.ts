import { injectable, inject } from 'tsyringe';
import { BaseRepository } from './BaseRepository';
import { Book } from '../entities/Book';
import { DataSource } from 'typeorm';
import { IBookRepository } from '../interfaces/IBookRepository';

@injectable()
export class BookRepository extends BaseRepository<Book> implements IBookRepository {
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(Book, dataSource);
  }
}
