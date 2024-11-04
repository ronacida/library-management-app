export interface IBorrowService {
  borrowBook(userId: number, bookId: number): Promise<void>;
  returnBook(userId: number, bookId: number, score: number): Promise<void>;
}