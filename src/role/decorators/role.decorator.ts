import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../schemas/role.schema';

export const GetRole = createParamDecorator(
  (data: string, ctx: ExecutionContext): Role => {
    const { __role } = ctx.switchToHttp().getRequest();
    return __role;
  },
);
