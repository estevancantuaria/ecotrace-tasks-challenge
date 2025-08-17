import { useState, useEffect } from 'react';
import { tasksService, type Task, type User } from '../services/task_service';
import { ERROR_MESSAGES } from '../constants/error_messages';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);

  const [statusFilter, setStatusFilter] = useState<
    'all' | 'open' | 'completed'
  >('all');

  const loadTasksAndUsers = async (
    status?: boolean,
    pageArg = page,
    limitArg = limit
  ) => {
    try {
      setLoading(true);
      const offset = pageArg * limitArg;

      const [{ tasks: tasksData, total }, usersData] = await Promise.all([
        tasksService.getTasks(status, limitArg, offset),
        tasksService.getUsers(),
      ]);

      const tasksWithUserId = tasksData.map((task) => {
        const user = usersData.find((u) => u.name === task.userName);
        return { ...task, userId: user ? user.id : '' };
      });

      setTasks(tasksWithUserId);
      setUsers(usersData);
      setTotal(total);
    } catch {
      throw new Error(ERROR_MESSAGES.LOAD_TASKS);
    } finally {
      setLoading(false);
    }
  };

  // Observa mudanças de filtros, página ou limite
  useEffect(() => {
    let status: boolean | undefined;
    if (statusFilter === 'open') status = false;
    if (statusFilter === 'completed') status = true;
    loadTasksAndUsers(status, page, limit);
  }, [page, limit, statusFilter]);

  return {
    tasks,
    setTasks,
    users,
    loading,
    loadTasksAndUsers,
    page,
    setPage,
    limit,
    setLimit,
    total,
    statusFilter,
    setStatusFilter,
  };
}
