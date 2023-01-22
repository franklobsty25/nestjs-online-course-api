import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ROLE_ENUM_ACCESS_FOR } from 'src/common/constants/role.enum.constant';
import { RoleService } from 'src/role/services/role.service';

@Injectable()
export class UserAdminAccessGuard implements CanActivate {
  constructor(private readonly roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { user } = request;
    const { role } = user;
    console.log(user);

    const userRole = await this.roleService.findOneById(role);

    if (!userRole) throw new ForbiddenException();

    if (
      userRole.accessFor === ROLE_ENUM_ACCESS_FOR.Admin ||
      userRole.accessFor === ROLE_ENUM_ACCESS_FOR.Super_Admin
    )
      return true;

    return false;
  }
}
