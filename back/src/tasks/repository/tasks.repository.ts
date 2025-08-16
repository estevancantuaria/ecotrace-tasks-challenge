import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { ITasksRepository } from './interface/tasks_repository.interface';
import { ERROR_MESSAGES } from '../../common/errors/errors_messages';

@Injectable()
export class TasksRepository implements ITasksRepository {

  constructor(

    @InjectRepository(Task)
    private readonly repo: Repository<Task>,

  ) { }

  async findAll(limit: number, offset: number, status?: boolean): Promise<Task[]> {
    try {
      const statusFilter = status !== undefined ? { completed: status } : {};

      const result = await this.repo.find({
        take: limit,
        skip: offset,
        order: {
          createdAt: "ASC"
        },
        where: statusFilter,
        relations: ['user'],
        select: {
          user: {
            name: true,
          },
        },
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.LIST_ERROR);
    }
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    try {
      const task = this.repo.create(taskData);
      return await this.repo.save(task);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.CREATE_ERROR);
    }
  }

  async updateStatus(id: string, completed: boolean): Promise<Task> {
    try {
      const task = await this.findById(id);
      task.completed = completed;
      return await this.repo.save(task);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.UPDATE_ERROR);
    }
  }

  async update(id: string, updateData: Partial<Task>): Promise<Task> {
    try {
      const task = await this.findById(id);
      Object.assign(task, updateData);
      return await this.repo.save(task);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.UPDATE_ERROR);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const task = await this.repo.findOne({
        where: { id },
        relations: ['user'],
        select: {
          user: {
            name: true,
          },
        },
      });

      if (!task) return false;

      await this.repo.remove(task);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.DELETE_ERROR);
    }
  }

  async findById(id: string): Promise<Task> {
    try {
      const task = await this.repo.findOne({
        where: { id },
        relations: ['user'],
        select: {
          user: {
            name: true,
          },
        },
      });

      return task;
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.FIND_ERROR);
    }
  }
}
