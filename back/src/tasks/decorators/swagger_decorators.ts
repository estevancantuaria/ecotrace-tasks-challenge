// back/src/tasks/decorators/swagger.decorators.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../../drivers/auth_guard';

export function AuthenticatedOperation(summary: string) {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary })
  );
}

export function TaskIdParam() {
  return ApiParam({
    name: 'id',
    description: 'UUID da tarefa no banco de dados',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  });
}

export function CustomApiParam(name: string, description: string, type: string, format: string, example: any) {
  return ApiParam({
    name,
    description,
    type,
    format,
    example
  });
}