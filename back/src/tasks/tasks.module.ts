import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Task } from './entities/tasks.entity';
import { TasksRepository } from './repository/tasks.repository';
import { UsersRepository } from 'src/users/repository/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User])
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: 'ITasksRepository',
      useClass: TasksRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UsersRepository
    }
  ],
})
export class TasksModule { }
