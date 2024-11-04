import { injectable, inject } from 'tsyringe';
import { BaseRepository } from './BaseRepository';
import { User } from '../entities/User';
import { DataSource } from 'typeorm';
import { IUserRepository } from '../interfaces/IUserRepository';

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(User, dataSource);
  }
}
