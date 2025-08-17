import { Inject, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';

import type { ITasksRepository } from './repository/interface/tasks_repository.interface';
import type { IUserRepository } from '../users/repository/interface/user_repository.interface';
import { CreateTaskDto } from './dtos/create_task.dto';
import { UpdateTaskDto } from './dtos/update_task.dto';
import { TaskPaginationDto } from './dtos/task_pagination.dto';
import { ERROR_MESSAGES } from '../common/errors/errors_messages';
import { TaskResponseDto } from './dtos/response_task.dto';

@Injectable()
export class TasksService {

  constructor(

    @Inject('ITasksRepository')
    private readonly tasksRepository: ITasksRepository,

    @Inject('IUserRepository')
    private readonly usersRepository: IUserRepository

  ) { }

  async create(dto: CreateTaskDto): Promise<TaskResponseDto> {
    try {
      const { user_id, ...taskData } = dto;

      const user = await this.usersRepository.findById(user_id);

      if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

      const task = await this.tasksRepository.create({
        ...taskData,
        completed: dto.completed ?? false,
        user,
      });

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        userName: task.user.name,
      }
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.CREATE_ERROR);
    }
  }

  async findAll(paginationDto: TaskPaginationDto): Promise<{ tasks: TaskResponseDto[], total: number }> {
    try {
      const { limit = 10, offset = 0, status } = paginationDto;

      const [tasks, total] = await this.tasksRepository.findAll(limit, offset, status);

      return {
        tasks: tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        userName: task.user.name,
      })),
      total,
    };
    } catch (error) {
      if (error instanceof InternalServerErrorException) throw error;
      console.log(error);
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.LIST_ERROR);
    }
  }

  async markStatus(id: string, completed: boolean): Promise<TaskResponseDto> {
    try {
      const task = await this.tasksRepository.findById(id);

      if (!task) throw new NotFoundException(ERROR_MESSAGES.TASK.NOT_FOUND);

      const updatedTask = await this.tasksRepository.updateStatus(id, completed);

      return {
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description,
        completed: updatedTask.completed,
        createdAt: updatedTask.createdAt,
        userName: updatedTask.user.name,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.UPDATE_ERROR);
    }
  }

  async update(id: string, updateData: UpdateTaskDto): Promise<TaskResponseDto> {
    try {
      const user = await this.usersRepository.findById(updateData.user_id);

      if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

      const task = await this.tasksRepository.findById(id);

      if (!task) throw new NotFoundException(ERROR_MESSAGES.TASK.NOT_FOUND);

      const updatedTask = await this.tasksRepository.update(id, {
        ...updateData,
        user,
      });

      return {
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description,
        completed: updatedTask.completed,
        createdAt: updatedTask.createdAt,
        userName: updatedTask.user.name,
      }
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.UPDATE_ERROR);
    }
  }

  async findById(id: string): Promise<TaskResponseDto> {
    try {
      const task = await this.tasksRepository.findById(id);

      if (!task) throw new NotFoundException(ERROR_MESSAGES.TASK.NOT_FOUND);

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        userName: task.user.name,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.FIND_ERROR);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const result = await this.tasksRepository.delete(id);

      if (!result) throw new NotFoundException(ERROR_MESSAGES.TASK.NOT_FOUND);

      return { message: ERROR_MESSAGES.TASK.DELETE_SUCCESS };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.TASK.DELETE_ERROR);
    }
  }
}
