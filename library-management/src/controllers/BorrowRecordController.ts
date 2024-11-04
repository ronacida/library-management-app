import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IBorrowService } from '../interfaces/IBorrowRecordService';

@injectable()
export class BorrowController {
    constructor(@inject('IBorrowService') private readonly borrowService: IBorrowService) { }

    async borrowBook(req: Request, res: Response): Promise<Response<void>> {
        try {
            const userId = parseInt(req.params.userId);
            const bookId = parseInt(req.params.bookId);
            await this.borrowService.borrowBook(userId, bookId);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async returnBook(req: Request, res: Response): Promise<Response<void>> {
        try {
            const userId = parseInt(req.params.userId);
            const bookId = parseInt(req.params.bookId);
            const { score } = req.body;
            await this.borrowService.returnBook(userId, bookId, score);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}
