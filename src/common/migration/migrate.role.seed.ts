import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { RoleService } from 'src/role/services/role.service';
import { ROLE_ENUM } from '../constants/role.enum.constant';

@Injectable()
export class RoleSeed {
  constructor(private readonly roleService: RoleService) {}

  @Command({
    command: 'seed:role',
    describe: 'seed roles',
  })
  async seeds(): Promise<void> {
    try {
      await this.roleService.create({
        name: ROLE_ENUM.Admin,
      });

      await this.roleService.create({
        name: ROLE_ENUM.User,
      });
    } catch (error) {
      throw new Error(error);
    }

    return;
  }

  @Command({
    command: 'remove:role',
    describe: 'remove roles',
  })
  async remove(): Promise<void> {
    try {
      await this.roleService.deleteAll();
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }
}
