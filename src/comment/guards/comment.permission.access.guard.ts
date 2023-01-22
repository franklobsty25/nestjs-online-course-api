import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommentPermissionAccessGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { __comment, user } = request;

    if (!__comment) throw new NotFoundException(`Comment not found`);

    if (user._id.toString() === __comment.creator.toString()) return true;

    return false;
  }
}
