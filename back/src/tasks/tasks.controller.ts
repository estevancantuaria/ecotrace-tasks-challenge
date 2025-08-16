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

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @AuthenticatedOperation('Criar uma nova tarefa')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @AuthenticatedOperation('Listar todas as tarefas')
  findAll(@Query() taskPaginationDto: TaskPaginationDto): Promise<TaskResponseDto[]> {
    return this.tasksService.findAll(taskPaginationDto);
  }

  @Get(':id')
  @AuthenticatedOperation('Buscar tarefa por ID')
  @TaskIdParam()
  findById(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.tasksService.findById(id);
  }

  @Put(':id/status')
  @AuthenticatedOperation('Atualizar status da tarefa')
  @TaskIdParam()
  updateStatus(
    @Param('id') id: string,
    @Body() body: { completed: boolean },
  ): Promise<TaskResponseDto> {
    return this.tasksService.markStatus(id, body.completed);
  }

  @Put(':id')
  @AuthenticatedOperation('Atualizar tarefa')
  @TaskIdParam()
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @AuthenticatedOperation('Deletar tarefa')
  @TaskIdParam()
  deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.delete(id);
  }

}
