export const usersRepositoryServiceMock = {
    findByEmail: jest.fn().mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Test User',
        email: 'test@test.com',
        password: '123456',
    }),
};