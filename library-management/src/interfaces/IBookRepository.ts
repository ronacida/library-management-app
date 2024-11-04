import { IBaseRepository } from './IBaseRepository';
import { Book } from '../entities/Book';

export interface IBookRepository extends IBaseRepository<Book> {}