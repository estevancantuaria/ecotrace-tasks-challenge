import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsPositive, Min } from 'class-validator';

export class TaskPaginationDto {
  @ApiProperty({
    description: 'Limite de itens por página',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @ApiProperty({
    description: 'Número da página',
    example: 0,
    default: 0,
  })
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty({
    description: 'Filtro de status',
    example: true
  })
  status?: boolean;
}
