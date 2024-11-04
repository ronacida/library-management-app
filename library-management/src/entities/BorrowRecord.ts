import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class BorrowRecord {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.borrowRecords, { onDelete: 'CASCADE' })
    user!: User;

    @ManyToOne(() => Book, (book) => book.borrowRecords, { onDelete: 'CASCADE' })
    book!: Book;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    borrowed_at!: Date;

    @Column({ type: 'timestamp', nullable: true })
    returned_at?: Date;

    @Column({ type: 'float', nullable: true })
    rating?: number;
}