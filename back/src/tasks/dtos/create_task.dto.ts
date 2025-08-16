import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, MinLength, IsOptional, IsUUID } from 'class-validator';

export class CreateTaskDto {

  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Concluir projeto',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'ID do usuário responsável pela tarefa',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID()
  user_id: string

  @ApiPropertyOptional({
    description: 'Descrição detalhada da tarefa',
    example: 'Finalizar todas as funcionalidades do sistema de tarefas',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    description: 'Status de conclusão da tarefa',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed: boolean = false;
}