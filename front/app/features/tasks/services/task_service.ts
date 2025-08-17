import { apiClient } from '../../../services/api_client';
import { ERROR_MESSAGES } from '../constants/error_messages';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateTaskData {
  title: string;
  user_id: string;
  description: string;
  completed: boolean;
}

export interface UpdateTaskData {
  title: string;
  user_id: string;
  description: string;
  completed: boolean;
}

export const tasksService = {
  async getTasks(
    status?: boolean,
    limit = 10,
    offset = 0
  ): Promise<{ tasks: Task[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (status !== undefined) queryParams.append('status', String(status));
      queryParams.append('limit', String(limit));
      queryParams.append('offset', String(offset));

      const response = await apiClient.get<{ tasks: Task[]; total: number }>(
        `/tasks?${queryParams.toString()}`
      );
      return response;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.LOAD_TASKS);
    }
  },

  async createTask(taskData: CreateTaskData): Promise<Task> {
    try {
      const task = await apiClient.post<Task>('/tasks', taskData);
      return task;
    } catch {
      throw new Error(ERROR_MESSAGES.CREATE_TASK);
    }
  },

  async updateTask(taskId: string, taskData: UpdateTaskData): Promise<Task> {
    try {
      const task = await apiClient.put<Task>(`/tasks/${taskId}`, taskData);
      return task;
    } catch {
      throw new Error(ERROR_MESSAGES.UPDATE_TASK);
    }
  },

  async deleteTask(taskId: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.delete<{ message: string }>(
        `/tasks/${taskId}`
      );
      return response;
    } catch {
      throw new Error(ERROR_MESSAGES.DELETE_TASK);
    }
  },

  async getUserById(userId: string): Promise<User> {
    try {
      const user = await apiClient.get<User>(`/users/${userId}`);
      return user;
    } catch {
      throw new Error(ERROR_MESSAGES.LOAD_USERS);
    }
  },

  async getUsers(): Promise<User[]> {
    try {
      const users = await apiClient.get<User[]>('/users');
      return users;
    } catch {
      throw new Error(ERROR_MESSAGES.LOAD_USERS);
    }
  },
};