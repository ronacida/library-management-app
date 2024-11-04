import { UserDTO } from '../dtos/UserDTO';
import { BorrowRecordDTO } from '../dtos/BorrowRecordDTO';

export interface IUserService {
  getAllUsers(): Promise<UserDTO[]>;
  getUserDetails(userId: number): Promise<{ user: UserDTO; books: { past: BorrowRecordDTO[]; current: BorrowRecordDTO[] } }>;
  createUser(userData: UserDTO): Promise<UserDTO>;
  updateUser(userId: number, userData: Partial<UserDTO>): Promise<void>;
}
