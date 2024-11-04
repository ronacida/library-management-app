import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BorrowRecord } from './BorrowRecord';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @OneToMany(() => BorrowRecord, (borrowRecord) => borrowRecord.book)
    borrowRecords?: BorrowRecord[];

    @Column({ type: 'float', nullable: false, default: -1 })
    score!: number;
}