import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';
import { UserPayloadGuard } from '../guards/user.payload.guard';
import { UserPutToRequestGuard } from '../guards/user.put-to-request.guard';

export function UserAdminGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(UserPutToRequestGuard, UserPayloadGuard, UserNotFoundGuard),
  );
}
