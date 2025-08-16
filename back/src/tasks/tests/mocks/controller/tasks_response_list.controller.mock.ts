const fixedDate = new Date('2025-01-01T00:00:00Z');

export const tasksEntityListControllerMock = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: fixedDate,
    userName: 'Test User',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    title: 'Test Task 2',
    description: 'Test Description 2',
    completed: true,
    createdAt: fixedDate,
    userName: 'Test User 2',
  },
];