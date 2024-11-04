import { injectable } from 'tsyringe';
import { UserRepository } from '../repositories/UserRepository';
import { plainToClass } from 'class-transformer';
import { IUserService } from '../interfaces/IUserService';
import { BorrowRecord } from '../entities/BorrowRecord';
import { UserDTO } from '../dtos/UserDTO';
import { User } from '../entities/User';
import { BorrowRecordDTO } from '../dtos/BorrowRecordDTO';

@injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) { }

  async getAllUsers(): Promise<{ id: number; name: string }[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => ({ id: user.id, name: user.name }));
  }

  async getUserDetails(userId: number): Promise<{ user: UserDTO; books: { past: BorrowRecordDTO[]; current: BorrowRecordDTO[] } }> {
    const user = await this.userRepository.findDetailsById(userId, ['borrowRecords', 'borrowRecords.book']);
    if (!user)
      throw new Error('User not found');

    const { borrowRecords, ...userWithoutRecords } = user;

    if (borrowRecords === null)
      return { user: plainToClass(UserDTO, userWithoutRecords), books: { past: [], current: [] } };

    const past = borrowRecords?.filter(record => record.returned_at !== null).map(record => plainToClass(BorrowRecordDTO, record)) ?? [];
    const current = borrowRecords?.filter(record => record.returned_at === null).map(record => plainToClass(BorrowRecordDTO, record)) ?? [];

    return {
      user: plainToClass(UserDTO, userWithoutRecords),
      books: { past, current }
    };
  }

  async createUser(userData: UserDTO): Promise<UserDTO> {
    const userEntity = plainToClass(User, {
      ...userData,
      borrowRecords: userData.borrowRecords?.map(record => plainToClass(BorrowRecord, record)),
    });

    const newUser = await this.userRepository.create(userEntity);
    return plainToClass(UserDTO, newUser);
  }

  async updateUser(userId: number, userData: Partial<UserDTO>): Promise<void> {
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) throw new Error('User not found');

    const updatedUser = plainToClass(User, {
      ...existingUser,
      ...userData,
      borrowRecords: userData.borrowRecords?.map(record => plainToClass(BorrowRecord, record)) ?? existingUser.borrowRecords,
    });

    await this.userRepository.update(updatedUser);
  }
}
