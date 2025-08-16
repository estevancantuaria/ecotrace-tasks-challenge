import { Test, TestingModule } from "@nestjs/testing";
import { UsersRepository } from "../repository/users.repository";
import { User } from "../entities/users.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { usersRepositoryMock } from "./mocks/repository/users.repository.mock";

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock.useValue,
        },
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  test('Validating the definition', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('findByEmail', () => {

    const expectedUser = {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Test User',
      email: 'test@test.com',
      password: '123456',
    };

    test('should return a user by email', async () => {
      const user = await usersRepository.findByEmail('test@test.com');
      expect(user).toEqual(expectedUser);
    });
  });
});