import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';
import { AuthGuard } from '../../drivers/auth_guard';
import { tasksServiceControllerMock } from './mocks/controller/tasks_service.controller.mock';
import { CreateTaskDto } from '../dtos/create_task.dto';
import { TaskResponseDto } from '../dtos/response_task.dto';
import { tasksEntityListControllerMock } from './mocks/controller/tasks_response_list.controller.mock';
import { taskResponseDtoControllerMock } from './mocks/controller/tasks_response.controller.mock';
import { ERROR_MESSAGES } from '../../common/errors/errors_messages';


describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const mockAuthGuard = {
      canActivate: jest.fn(() => true),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: tasksServiceControllerMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<TasksController>(TasksController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        user_id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      };

      const result = await controller.createTask(createTaskDto);

      expect(result).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: expect.any(Date),
        userName: 'Test User',
      });
    });
  });


  describe('findAll', () => {
    it('should return all tasks', async () => {
      const result: TaskResponseDto[] = await controller.findAll({ limit: 10, offset: 0 });
      expect(result).toEqual(tasksEntityListControllerMock);
    });

    it('should return all tasks with status true', async () => {
      const result: TaskResponseDto[] = await controller.findAll({ limit: 10, offset: 0, status: true });
      expect(result).toEqual(tasksEntityListControllerMock.filter(task => task.completed === true));
    });
  });

  describe('findById', () => {
    it('should return a task by ID', async () => {
      const result = await controller.findById('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(taskResponseDtoControllerMock);
    });
  });

  describe('markStatus', () => {
    it('should mark a task as completed', async () => {
      const result = await controller.updateStatus('123e4567-e89b-12d3-a456-426614174000', { completed: true });
      expect(result).toEqual(taskResponseDtoControllerMock);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const result = await controller.updateTask('123e4567-e89b-12d3-a456-426614174000', {
        title: 'Updated Task',
        description: 'Updated Description',
        completed: true,
      });
      expect(result).toEqual(taskResponseDtoControllerMock);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const result = await controller.deleteTask('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual({ message: ERROR_MESSAGES.TASK.DELETE_SUCCESS });
    });
  });
});