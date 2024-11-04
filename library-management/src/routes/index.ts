import { Router, Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { BookController } from '../controllers/BookController';
import { UserController } from '../controllers/UserController';
import { BorrowController } from '../controllers/BorrowRecordController';

const router = Router();

// Get controller instances from the DI container
const bookController = container.resolve(BookController);
const userController = container.resolve(UserController);
const borrowController = container.resolve(BorrowController);

// Wrap controller methods to ensure compatibility with Express' RequestHandler
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Define book routes
router.get('/books', asyncHandler((req, res) => bookController.getBooks(req, res)));
router.get('/books/:id', asyncHandler((req, res) => bookController.getBookDetails(req, res)));
router.post('/books', asyncHandler((req, res) => bookController.createBook(req, res)));
router.put('/books/:id', asyncHandler((req, res) => bookController.updateBook(req, res)));

// Define user routes
router.get('/users', asyncHandler((req, res) => userController.getUsers(req, res)));
router.get('/users/:id', asyncHandler((req, res) => userController.getUserDetails(req, res)));
router.post('/users', asyncHandler((req, res) => userController.createUser(req, res)));
router.put('/users/:id', asyncHandler((req, res) => userController.updateUser(req, res)));

// Define borrow routes
router.post('/users/:userId/borrow/:bookId', asyncHandler((req, res) => borrowController.borrowBook(req, res)));
router.post('/users/:userId/return/:bookId', asyncHandler((req, res) => borrowController.returnBook(req, res)));

export default router;
