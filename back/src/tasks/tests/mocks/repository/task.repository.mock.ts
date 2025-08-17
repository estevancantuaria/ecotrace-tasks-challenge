import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../../../entities/tasks.entity';
import { taskEntityList } from './tasks_entity_list.repository.mock';
import { taskMock } from './task_mock.repository.mock';

export const tasksRepositoryMock = {
  provide: getRepositoryToken(Task),
  useValue: {
    findAndCount: jest.fn().mockImplementation(({ where }) => {
      if (where && where.completed !== undefined) {
        const filtered = taskEntityList[0].filter(task => task.completed === where.completed);
        return Promise.resolve([filtered, filtered.length]);
      }
      return Promise.resolve(taskEntityList);
    }),
    findOne: jest.fn().mockImplementation((where) => {
      const task = taskEntityList[0].find(task => task.id === where.where.id);
      return task ? Promise.resolve(task) : Promise.resolve(null);
    }),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(taskMock),
    update: jest.fn().mockResolvedValue(taskMock),
    remove: jest.fn(),
  },
};