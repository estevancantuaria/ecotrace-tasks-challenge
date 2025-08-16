import { Inject, Injectable, UnauthorizedException, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import type { IUserRepository } from './repository/interface/user_repository.interface';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { signInDto } from './dtos/sign_user.dto';
import { BcryptDriver } from '../drivers/bcrypt_driver';
import { AuthGuard } from '../drivers/auth_guard';
import { ERROR_MESSAGES } from '../common/errors/errors_messages';
import { UserResponseDto } from './dtos/user_response.dto';

@Injectable()
export class UsersService {

  constructor(
    @Inject('IUserRepository')
    private readonly usersRepository: IUserRepository,
    private authGuard: AuthGuard,
    private bcryptDriver: BcryptDriver
  ) { }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const { password, ...userData } = dto;
      const hashedPassword = await this.bcryptDriver.hash(password);

      const user = await this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof ConflictException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.CREATE_ERROR);
    }
  }

  async signIn(signInDto: signInDto): Promise<UserResponseDto> {
    try {
      const { email, password } = signInDto;

      const user = await this.usersRepository.findByEmail(email);

      if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

      const passwordValid = await this.bcryptDriver.compare(password, user.password);

      if (!passwordValid) throw new UnauthorizedException(ERROR_MESSAGES.USER.INVALID_PASSWORD);

      const payload = { id: user.id, email: user.email };
      const accessToken = await this.authGuard.sign(payload);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: accessToken,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.FIND_ERROR);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<UserResponseDto[]> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const users = await this.usersRepository.findAll(limit, offset);

      return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
    } catch (error) {
      if (error instanceof InternalServerErrorException) throw error;
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.LIST_ERROR);
    }
  }

  async findById(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.usersRepository.findById(id);

      if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.FIND_ERROR);
    }
  }

  async update(id: string, updateData: UpdateUserDto): Promise<UserResponseDto> {
    try {
      if (updateData.password) {
        updateData.password = await this.bcryptDriver.hash(updateData.password);
      }

      const user = await this.usersRepository.findById(id);

      if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

      const updatedUser = await this.usersRepository.update(id, updateData);

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.UPDATE_ERROR);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const user = await this.usersRepository.findById(id);

      if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

      await this.usersRepository.delete(id);

      return { message: ERROR_MESSAGES.USER.DELETE_SUCCESS };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.DELETE_ERROR);
    }
  }
}
