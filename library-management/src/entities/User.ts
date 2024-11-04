import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BorrowRecord } from './BorrowRecord';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @OneToMany(() => BorrowRecord, (borrowRecord) => borrowRecord.user)
    borrowRecords?: BorrowRecord[];
}
