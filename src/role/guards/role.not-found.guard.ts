import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class RoleNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __role } = context.switchToHttp().getRequest();

    if (!__role) {
      throw new NotFoundException('Role not found');
    }

    return true;
  }
}
