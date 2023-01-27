import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommentNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { __comment } = request;

    if (!__comment) throw new NotFoundException(`Comment not found`);

    return true;
  }
}
