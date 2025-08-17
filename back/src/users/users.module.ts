import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { AuthGuard } from '../drivers/auth_guard';
import { BcryptDriver } from '../drivers/bcrypt_driver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'IUserRepository',
      useClass: UsersRepository,
    },
    {
      provide: 'IAuthGuard',
      useClass: AuthGuard,
    },
    BcryptDriver,
  ],
})
export class UsersModule { }
