import { DataSource } from 'typeorm';
import { Book } from '../entities/Book';
import { BorrowRecord } from '../entities/BorrowRecord';
import { User } from '../entities/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST ?? 'localhost',
    port: parseInt(process.env.TYPEORM_PORT ?? '5432', 10),
    username: process.env.TYPEORM_USERNAME ?? 'postgres',
    password: process.env.TYPEORM_PASSWORD ?? '789456123Qwer.',
    database: process.env.TYPEORM_DATABASE ?? 'libraryDb',
    synchronize: false,
    logging: false,
    dropSchema: false,
    entities: [User, Book, BorrowRecord],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: [],
});


// Initialize the data source
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });
