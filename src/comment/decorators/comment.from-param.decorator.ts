import { applyDecorators, UseGuards } from '@nestjs/common';
import { CommentPermissionAccessGuard } from '../guards/comment.permission.access.guard';
import { CommentNotFoundGuard } from '../guards/comment.not-found.guard';
import { CommentPutToRequestGuard } from '../guards/comment.put-to-request.guard';

export function CommentFromParamGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      CommentPutToRequestGuard,
      CommentPermissionAccessGuard,
      CommentNotFoundGuard,
    ),
  );
}
