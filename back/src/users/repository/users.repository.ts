import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/users.entity";
import { Repository } from "typeorm";
import { IUserRepository } from "./interface/user_repository.interface";
import { ERROR_MESSAGES } from "../../common/errors/errors_messages";

@Injectable()
export class UsersRepository implements IUserRepository {

  constructor(

    @InjectRepository(User)
    private readonly repo: Repository<User>,

  ) { }

  async create(user: Partial<User>): Promise<User> {
    try {
      const result = await this.repo.save(user);
      return result;
    } catch (error) {
      if (error.code === '23505') throw new ConflictException(ERROR_MESSAGES.USER.ALREADY_EXISTS);
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.CREATE_ERROR);
    }
  }

  async findAll(limit: number, offset: number): Promise<User[]> {
    try {
      return await this.repo.find({
        take: limit,
        skip: offset,
        order: { name: "ASC" },
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.LIST_ERROR);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.repo.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.FIND_ERROR);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.repo.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.FIND_ERROR);
    }
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    try {
      const user = await this.findById(id);
      Object.assign(user, updateData);
      return await this.repo.save(user);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.UPDATE_ERROR);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const user = await this.findById(id);
      await this.repo.remove(user);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.USER.DELETE_ERROR);
    }
  }
}
