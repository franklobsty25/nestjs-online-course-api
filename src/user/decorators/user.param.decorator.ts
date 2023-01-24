import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';
import { UserPutToRequestGuard } from '../guards/user.put-to-request.guard';
import { User } from '../schemas/user.schema';

export function UserParamGuard(): MethodDecorator {
  return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export const UserParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const { __user } = request;

    return __user;
  },
);
