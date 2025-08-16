import { Task } from '../../entities/tasks.entity';

export interface ITasksRepository {
  findAll(limit?: number, offset?: number, status?: boolean): Promise<Task[]>;
  create(taskData: Partial<Task>): Promise<Task>;
  updateStatus(id: string, completed: boolean): Promise<Task>;
  update(id: string, updateData: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Task>;
}