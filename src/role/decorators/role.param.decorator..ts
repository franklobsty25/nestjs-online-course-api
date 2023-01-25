import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { RoleNotFoundGuard } from '../guards/role.not-found.guard';
import { RolePutToRequestGuard } from '../guards/role.put-to-request.guard';
import { Role } from '../schemas/role.schema';

export function RoleParamGuard(): MethodDecorator {
  return applyDecorators(UseGuards(RolePutToRequestGuard, RoleNotFoundGuard));
}

export const RoleParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Role => {
    const request = ctx.switchToHttp().getRequest();
    const { __role } = request;

    return __role;
  },
);
