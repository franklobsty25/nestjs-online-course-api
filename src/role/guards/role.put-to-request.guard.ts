import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../schemas/role.schema';
import { RoleService } from '../services/role.service';

@Injectable()
export class RolePutToRequestGuard implements CanActivate {
  constructor(private readonly roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const { id } = params;

    const check: Role = await this.roleService.findOneById(id);
    request.__role = check;

    return true;
  }
}
