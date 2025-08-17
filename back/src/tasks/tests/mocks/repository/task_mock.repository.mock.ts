import { User } from "src/users/entities/users.entity";

export const taskMock = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Completar a documentação do projeto',
    description: 'Concluir documentação no Confluence.',
    completed: false,
    user: { id: '1', name: 'Ana Silva', email: 'ana.silva@exemplo.com' } as User,
    createdAt: new Date(),
    updatedAt: new Date(),
};