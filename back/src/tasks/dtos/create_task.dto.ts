import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, MinLength, IsOptional, IsUUID } from 'class-validator';
import { CREATE_TASK_DTO_ANNOTATIONS } from '../constants/dto_swagger_annotations';

export class CreateTaskDto {

  @ApiProperty({
    ...CREATE_TASK_DTO_ANNOTATIONS.TITLE,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    ...CREATE_TASK_DTO_ANNOTATIONS.USER_ID,
  })
  @IsUUID()
  user_id: string

  @ApiPropertyOptional({
    ...CREATE_TASK_DTO_ANNOTATIONS.DESCRIPTION,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    ...CREATE_TASK_DTO_ANNOTATIONS.COMPLETED,
  })
  @IsBoolean()
  @IsOptional()
  completed: boolean = false;
}