import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create_task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) { }
