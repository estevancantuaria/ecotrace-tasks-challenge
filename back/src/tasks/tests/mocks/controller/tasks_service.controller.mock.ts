import { ERROR_MESSAGES } from "../../../../common/errors/errors_messages";
import { tasksEntityListControllerMock } from "./tasks_response_list.controller.mock";
import { taskResponseDtoControllerMock } from "./tasks_response.controller.mock";
    
export const tasksServiceControllerMock = {
  create: jest.fn().mockResolvedValue(taskResponseDtoControllerMock),
  findAll: jest.fn().mockImplementation(({ limit, offset, status }: { limit: number; offset: number; status?: boolean }) => {
    let tasks = tasksEntityListControllerMock;
    if (status !== undefined) {
      tasks = tasks.filter(task => task.completed === status);
    }
    return Promise.resolve({ tasks, total: tasks.length });
  }),
  findById: jest.fn().mockResolvedValue(taskResponseDtoControllerMock),
  markStatus: jest.fn().mockResolvedValue(taskResponseDtoControllerMock),
  update: jest.fn().mockResolvedValue(taskResponseDtoControllerMock),
  delete: jest.fn().mockResolvedValue({ message: ERROR_MESSAGES.TASK.DELETE_SUCCESS }),
};