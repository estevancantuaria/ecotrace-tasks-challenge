// back/src/tasks/decorators/swagger.decorators.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../../drivers/auth_guard';
import { TASK_ID_PARAM_ANNOTATIONS } from '../constants/decorators_swagger_annotations';

export function AuthenticatedOperation(summary: string) {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary })
  );
}

export function TaskIdParam() {
  return ApiParam({
    ...TASK_ID_PARAM_ANNOTATIONS.ID,
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