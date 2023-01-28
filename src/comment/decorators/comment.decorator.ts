import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CommentDocument } from '../schemas/comment.schema';

export const GetComment = createParamDecorator(
  (data: unknown, cxt: ExecutionContext): CommentDocument => {
    const request = cxt.switchToHttp().getRequest();
    const { __comment } = request;

    return __comment;
  },
);
