import { IBaseRepository } from './IBaseRepository';
import { User } from '../entities/User';

export interface IUserRepository extends IBaseRepository<User> {}