import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create_task.dto';
import { UpdateTaskDto } from './dtos/update_task.dto';
import { AuthGuard } from '../drivers/auth_guard';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { TaskPaginationDto } from './dtos/task_pagination.dto';
import { TaskResponseDto } from './dtos/response_task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  findAll(@Query() taskPaginationDto: TaskPaginationDto): Promise<TaskResponseDto[]> {
    return this.tasksService.findAll(taskPaginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Buscar tarefa por ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID da tarefa no banco de dados',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  findById(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.tasksService.findById(id);
  }

  @Put(':id/status')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar status da tarefa' })
  @ApiParam({
    name: 'id',
    description: 'UUID da tarefa no banco de dados',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  updateStatus(
    @Param('id') id: string,
    @Body() body: { completed: boolean },
  ): Promise<TaskResponseDto> {
    return this.tasksService.markStatus(id, body.completed);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  @ApiParam({
    name: 'id',
    description: 'UUID da tarefa no banco de dados',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deletar tarefa' })
  @ApiParam({
    name: 'id',
    description: 'UUID da tarefa no banco de dados',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.delete(id);
  }

}
