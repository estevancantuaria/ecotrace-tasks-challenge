import { Test, TestingModule } from '@nestjs/testing';
import { TasksRepository } from '../repository/tasks.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entities/tasks.entity';
import { tasksRepositoryMock } from './mocks/repository/task.repository.mock';
import { taskEntityList } from './mocks/repository/tasks_entity_list.repository.mock';

describe('TasksRepository', () => {
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksRepository,
        {
          provide: getRepositoryToken(Task),
          useValue: tasksRepositoryMock.useValue,
        },
      ],
    }).compile();

    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  test('Validating the definition', () => {
    expect(tasksRepository).toBeDefined();
  });

  describe('findAll', () => {
    test('should return all tasks', async () => {
      const result = await tasksRepository.findAll(10, 0);
      expect(result).toEqual(taskEntityList);
    });

    test('should return all tasks with status true', async () => {
      const result = await tasksRepository.findAll(10, 0, true);
      expect(result).toEqual(taskEntityList.filter(task => task.completed === true));
    });

  });

  describe('findById', () => {
    test('should return a task by ID', async () => {
      const result = await tasksRepository.findById('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(taskEntityList[0]);
    });

  });

  describe('create', () => {
    test('should create a new task', async () => {
      const newTask = {
        title: 'Completar a documentação do projeto',
        description: 'Concluir documentação no Confluence.',
        completed: false,
        user_id: '123e4567-e89b-12d3-a456-426614174000',
      };
      const result = await tasksRepository.create(newTask);
      expect(result).toEqual(taskEntityList[0]);
    });
  });

  describe('update', () => {
    test('should update a task', async () => {
      const updatedTask = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Completar a documentação do projeto',
        description: 'Concluir documentação no Confluence.',
        completed: false,
        user_id: '123e4567-e89b-12d3-a456-426614174000',
      };
      const result = await tasksRepository.update('123e4567-e89b-12d3-a456-426614174000', updatedTask);
      expect(result).toEqual(taskEntityList[0]);
    });

  });

  describe('delete', () => {
    test('should delete a task', async () => {
      const result = await tasksRepository.delete('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(true);
    });

  });

  describe('updateStatus', () => {
    test('should update the status of a task', async () => {
      const result = await tasksRepository.updateStatus('123e4567-e89b-12d3-a456-426614174000', true);
      expect(result).toEqual(taskEntityList[0]);
    });
  });
}); 