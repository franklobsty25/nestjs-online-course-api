import { applyDecorators, UseGuards } from '@nestjs/common';
import { CommentNotFound } from '../guards/comment.not-found.guard';
import { CommentPutToRequestGuard } from '../guards/comment.put-to-request.guard';

export function CommentFromParamGuard(): MethodDecorator {
  return applyDecorators(UseGuards(CommentPutToRequestGuard, CommentNotFound));
}
