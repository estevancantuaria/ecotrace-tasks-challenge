import { User } from '../../entities/users.entity';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findAll(limit: number, offset: number): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: string, updateData: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}