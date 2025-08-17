import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create_task.dto';
import { UpdateTaskDto } from './dtos/update_task.dto';
import { TaskPaginationDto } from './dtos/task_pagination.dto';
import { TaskResponseDto } from './dtos/response_task.dto';
import { AuthenticatedOperation, TaskIdParam } from './decorators/swagger_decorators';
import { 
  CREATE_TASK_ANNOTATION, 
  DELETE_TASK_ANNOTATION, 
  FIND_ALL_ANNOTATION, 
  FIND_BY_ID_ANNOTATION, 
  UPDATE_TASK_ANNOTATION 
} from './constants/decorators_swagger_annotations';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @AuthenticatedOperation(CREATE_TASK_ANNOTATION)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @AuthenticatedOperation(FIND_ALL_ANNOTATION)
  findAll(@Query() taskPaginationDto: TaskPaginationDto): Promise<{ tasks: TaskResponseDto[], total: number }> {
    return this.tasksService.findAll(taskPaginationDto);
  }

  @Get(':id')
  @AuthenticatedOperation(FIND_BY_ID_ANNOTATION)
  @TaskIdParam()
  findById(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.tasksService.findById(id);
  }

  @Put(':id/status')
  @AuthenticatedOperation(UPDATE_TASK_ANNOTATION)
  @TaskIdParam()
  updateStatus(
    @Param('id') id: string,
    @Body() body: { completed: boolean },
  ): Promise<TaskResponseDto> {
    return this.tasksService.markStatus(id, body.completed);
  }

  @Put(':id')
  @AuthenticatedOperation(UPDATE_TASK_ANNOTATION)
  @TaskIdParam()
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @AuthenticatedOperation(DELETE_TASK_ANNOTATION)
  @TaskIdParam()
  deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.delete(id);
  }

}
