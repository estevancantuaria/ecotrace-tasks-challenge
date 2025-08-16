import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../../../entities/tasks.entity';
import { taskEntityList } from './tasks_entity_list.repository.mock';

export const tasksRepositoryMock = {
  provide: getRepositoryToken(Task),
  useValue: {
    find: jest.fn().mockImplementation(({ where }) => {
        if (where && where.completed !== undefined) {
          return Promise.resolve(taskEntityList.filter(task => task.completed === true));
        }
        return Promise.resolve(taskEntityList);
      }),
    findOne: jest.fn().mockImplementation((where) => {
      const task = taskEntityList.find(task => task.id === where.where.id);
      return task ? Promise.resolve(task) : Promise.resolve(null);
    }),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(taskEntityList[0]),
    update: jest.fn().mockResolvedValue(taskEntityList[0]),
    remove: jest.fn(),
  },
};