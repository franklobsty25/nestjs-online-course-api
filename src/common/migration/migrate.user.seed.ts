import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { Role } from 'src/role/schemas/role.schema';
import { RoleService } from 'src/role/services/role.service';
import { UserService } from 'src/user/services/user.service';
import { ROLE_ENUM } from '../constants/role.enum.constant';

@Injectable()
export class UserSeed {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @Command({
    command: 'seed:user',
    describe: 'seed admin',
  })
  async seeds(): Promise<void> {
    try {
      const adminRole: Role = await this.roleService.findOneByName(
        ROLE_ENUM.Admin,
      );

      await this.userService.createAdmin(adminRole);
    } catch (error) {
      throw new Error(error);
    }

    return;
  }

  @Command({
    command: 'remove:user',
    describe: 'remove admin',
  })
  async remove(): Promise<void> {
    try {
      await this.userService.deleteAdmin();
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }
}
