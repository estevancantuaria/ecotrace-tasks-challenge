import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { UnauthorizedException } from "@nestjs/common";
import { usersRepositoryServiceMock } from "./mocks/service/users_repository.service";
import type { IAuthGuard } from "../../drivers/interfaces/auth_guard_interface";
import type { IHashService } from "../../drivers/interfaces/hash_service_interface";

describe("UsersService - signIn", () => {
  let usersService: UsersService;
  let usersRepository: typeof usersRepositoryServiceMock;
  let bcryptDriver: IHashService;
  let authGuard: IAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: "IUserRepository",
          useValue: {   
            findByEmail: jest.fn(),
          },
        },
        {
          provide: 'IAuthGuard',
          useValue: { sign: jest.fn(), canActivate: jest.fn() },
        },
        {
          provide: 'IHashService',
          useValue: { compare: jest.fn(), hash: jest.fn() },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get("IUserRepository");
    bcryptDriver = module.get<IHashService>('IHashService');
    authGuard = module.get<IAuthGuard>('IAuthGuard');
  });

  it("should return the token and user data when credentials are correct", async () => {
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpass",
    };

    (usersRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (bcryptDriver.compare as jest.Mock).mockResolvedValue(true);
    (authGuard.sign as jest.Mock).mockResolvedValue("fake-jwt-token");

    const result = await usersService.signIn({
      email: "john@example.com",
      password: "123456",
    });


    expect(result).toEqual({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      token: "fake-jwt-token",
    });
  });

  it("should throw UnauthorizedException when password is incorrect", async () => {
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpass",
    };

    (usersRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (bcryptDriver.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      usersService.signIn({
        email: "john@example.com",
        password: "wrongpass",
      })
    ).rejects.toThrow(UnauthorizedException);
  });
});
