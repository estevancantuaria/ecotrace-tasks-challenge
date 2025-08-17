import { Task } from '../../../entities/tasks.entity';
import { User } from '../../../../users/entities/users.entity';

export const taskEntityList: [Task[], number] = [
  [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Completar a documentação do projeto',
      description: 'Concluir documentação no Confluence.',
      completed: false,
      user: { id: '1', name: 'Ana Silva', email: 'ana.silva@exemplo.com' } as User,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      title: 'Implementar módulo de autenticação',
      description: 'Desenvolver e integrar o módulo de autenticação usando JWT.',
      completed: true,
      user: { id: '2', name: 'Carlos Oliveira', email: 'carlos.oliveira@exemplo.com' } as User,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  2,
];
