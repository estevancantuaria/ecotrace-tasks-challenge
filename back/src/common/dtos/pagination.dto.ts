import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
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
}
