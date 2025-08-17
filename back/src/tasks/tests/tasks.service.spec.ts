import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { ITasksRepository } from '../repository/interface/tasks_repository.interface';
import { IUserRepository } from 'src/users/repository/interface/user_repository.interface';
import { CreateTaskDto } from '../dtos/create_task.dto';
import { TaskResponseDto } from '../dtos/response_task.dto';
import { tasksRepositoryMock } from './mocks/service/tasks_repository.service.mock';
import { TaskPaginationDto } from '../dtos/task_pagination.dto';
import { taskResponseDtoServiceMock } from './mocks/service/task_response_dto.service.mock';
import { NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES } from '../../common/errors/errors_messages';

describe('TasksService', () => {
  let service: TasksService;
  let tasksRepository: ITasksRepository;
  let usersRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: 'ITasksRepository',
          useValue: tasksRepositoryMock,
        },
        {
          provide: 'IUserRepository',
          useValue: {
            findById: jest.fn().mockResolvedValue({ id: '123e4567-e89b-12d3-a456-426614174001', name: 'Test User' }),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    tasksRepository = module.get<ITasksRepository>('ITasksRepository');
    usersRepository = module.get<IUserRepository>('IUserRepository');
  });

  describe('create', () => {
    it('should create a task and return TaskResponseDto', async () => {
      const createTaskDto: CreateTaskDto = {
        user_id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      };

      const result: TaskResponseDto = await service.create(createTaskDto);

      expect(result).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: expect.any(Date),
        userName: 'Test User',
      });

      expect(tasksRepository.create).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        user: { id: '123e4567-e89b-12d3-a456-426614174001', name: 'Test User' },
      });

      expect(usersRepository.findById).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174001');
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const result: { tasks: TaskResponseDto[], total: number } = await service.findAll({ limit: 10, offset: 0 } as TaskPaginationDto);
      expect(result).toEqual(taskResponseDtoServiceMock);
    });

    it('should return all tasks with status true', async () => {
      const result: { tasks: TaskResponseDto[], total: number } = await service.findAll({ limit: 10, offset: 0, status: true } as TaskPaginationDto);
      expect(result).toEqual({ tasks: taskResponseDtoServiceMock.tasks.filter(task => task.completed === true), total: taskResponseDtoServiceMock.tasks.filter(task => task.completed === true).length });
    });
  });

  describe('findById', () => {
    it('should return a task by ID', async () => {
      const result: TaskResponseDto = await service.findById('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(taskResponseDtoServiceMock.tasks[0]);
    });

    it('should throw an error if the task is not found', async () => {
      await expect(service.findById('123e4567-e89b-12d3-a456-426614174000333')).rejects.toThrow(NotFoundException);
    });
  });

  describe('markStatus', () => {
    it('should mark a task as completed', async () => {
      const result: TaskResponseDto = await service.markStatus('123e4567-e89b-12d3-a456-426614174000', true);
      expect(result).toEqual(taskResponseDtoServiceMock.tasks[0]);
    });

    it('should throw an error if the task is not found', async () => {
      await expect(service.markStatus('123e4567-e89b-12d3-a456-426614174000333', true)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const result: TaskResponseDto = await service.update('123e4567-e89b-12d3-a456-426614174000', { title: 'Updated Task' });
      expect(result).toEqual(taskResponseDtoServiceMock.tasks[0]);
    });

    it('should throw an error if the task is not found', async () => {
      await expect(service.update('123e4567-e89b-12d3-a456-426614174000333', { title: 'Updated Task' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const result: { message: string } = await service.delete('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual({ message: ERROR_MESSAGES.TASK.DELETE_SUCCESS });
    });

    it('should throw an error if the task is not found', async () => {
      await expect(service.delete('123e4567-e89b-12d3-a456-426614174000333')).rejects.toThrow(NotFoundException);
    });
  });
});