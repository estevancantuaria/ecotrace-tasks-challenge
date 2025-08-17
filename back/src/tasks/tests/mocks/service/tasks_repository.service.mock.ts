import { Task } from "../../../../tasks/entities/tasks.entity";
import { ERROR_MESSAGES } from "../../../../common/errors/errors_messages";
import { tasksEntityListServiceMock } from "./tasks_entity_list.service.mock";
import { NotFoundException } from "@nestjs/common";

export const tasksRepositoryMock = {
    create: jest.fn().mockResolvedValue({
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
      createdAt: new Date(),
      user: { name: 'Test User' },
    }),
    
    findAll: jest.fn().mockImplementation((limit:number, offset:number, status?:boolean) => {
      if(status !== undefined) {
        return Promise.resolve([tasksEntityListServiceMock.filter(task => task.completed === status), tasksEntityListServiceMock.filter(task => task.completed === status).length]);
      }
      return Promise.resolve([tasksEntityListServiceMock, tasksEntityListServiceMock.length]);
    }),

    findById: jest.fn().mockImplementation((id: string) => {
      const task = tasksEntityListServiceMock.find(task => task.id === id);
      if (!task) {
        throw new NotFoundException(ERROR_MESSAGES.TASK.NOT_FOUND);
      }
      return Promise.resolve(task);
    }),

    updateStatus: jest.fn().mockImplementation((id: string, completed: boolean) => {
      const task = tasksEntityListServiceMock.find(task => task.id === id);
      if (!task) {
        throw new NotFoundException(ERROR_MESSAGES.TASK.NOT_FOUND);
      }
      return Promise.resolve(task);
    }),

    update: jest.fn().mockImplementation((id: string, updateData: Partial<Task>) => {
      const task = tasksEntityListServiceMock.find(task => task.id === id);
      if (!task) {
        throw new NotFoundException(ERROR_MESSAGES.TASK.NOT_FOUND);
      }
      return Promise.resolve(task);
    }),

    delete: jest.fn().mockImplementation((id: string) => {
      const task = tasksEntityListServiceMock.find(task => task.id === id);
      if (!task) {
        throw new NotFoundException(ERROR_MESSAGES.TASK.NOT_FOUND);
      }
      return Promise.resolve({ message: ERROR_MESSAGES.TASK.DELETE_SUCCESS });
    }),
};