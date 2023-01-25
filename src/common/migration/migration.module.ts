import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { RoleSeed } from './migrate.role.seed';
import { UserSeed } from './migrate.user.seed';

@Module({
  imports: [CommandModule, RoleModule, UserModule],
  providers: [RoleSeed, UserSeed],
})
export class MigrationModule {}
