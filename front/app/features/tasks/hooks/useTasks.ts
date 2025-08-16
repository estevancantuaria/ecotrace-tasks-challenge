import { useState, useEffect } from 'react';
import { tasksService, type Task, type User } from '../services/task_service';
import { ERROR_MESSAGES } from '../constants/error_messages';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasksAndUsers = async () => {
    try {
      setLoading(true);
      const [tasksData, usersData] = await Promise.all([
        tasksService.getTasks(),
        tasksService.getUsers(),
      ]);

      const tasksWithUserId = tasksData.map(task => {
        const user = usersData.find(u => u.name === task.userName);
        return { ...task, userId: user ? user.id : '' };
      });

      setTasks(tasksWithUserId);
      setUsers(usersData);
    } catch (err) {
      throw new Error(ERROR_MESSAGES.LOAD_TASKS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasksAndUsers();
  }, []);

  return { tasks, setTasks, users, loading, loadTasksAndUsers };
}
