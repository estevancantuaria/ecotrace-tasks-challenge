import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsPositive, Min } from 'class-validator';

export class TaskPaginationDto {

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    description: 'Limite de itens por página',
    example: 10,
    default: 10,
    required: false,
  })
  limit?: number;

  @IsOptional()
  @ApiProperty({
    description: 'Número da página',
    example: 0,
    default: 0,
    required: false,
  })
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === undefined ? undefined : (value === 'true' || value === true))
  @ApiProperty({
    description: 'Filtro de status',
    example: true,
    required: false,
  })
  status?: boolean;
}
