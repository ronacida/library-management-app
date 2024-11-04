import 'reflect-metadata';
import { container } from 'tsyringe';
import { DataSource } from 'typeorm';
import { BookRepository } from './repositories/BookRepository';
import { UserRepository } from './repositories/UserRepository';
import { BorrowRecordRepository } from './repositories/BorrowRecordRepository';
import { BookService } from './services/BookService';
import { UserService } from './services/UserService';
import { BorrowService } from './services/BorrowRecordService';
import { IBookService } from './interfaces/IBookService';
import { IUserService } from './interfaces/IUserService';
import { IBorrowService } from './interfaces/IBorrowRecordService';
import { IBookRepository } from './interfaces/IBookRepository';
import { IUserRepository } from './interfaces/IUserRepository';
import { IBorrowRecordRepository } from './interfaces/IBorrowRecordRepository';
import { AppDataSource } from './config/data-source';

// Register the DataSource instance
container.register<DataSource>('DataSource', { useValue: AppDataSource });

// Register repositories
container.register<IBookRepository>('IBookRepository', { useClass: BookRepository });
container.register<IUserRepository>('IUserRepository', { useClass: UserRepository });
container.register<IBorrowRecordRepository>('IBorrowRecordRepository', { useClass: BorrowRecordRepository });

// Register services
container.register<IBookService>('IBookService', { useClass: BookService });
container.register<IUserService>('IUserService', { useClass: UserService });
container.register<IBorrowService>('IBorrowService', { useClass: BorrowService });
