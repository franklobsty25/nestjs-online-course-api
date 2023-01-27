import { Inject, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { RoleSeed } from './migrate.role.seed';
import { UserSeed } from './migrate.user.seed';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: `mongodb+srv://hr-bento:brh2mmzMBBXFvN40@cluster0.8psfm.mongodb.net/online-course?retryWrites=true&w=majority`,
      }),
    }),
    CommandModule,
    RoleModule,
    UserModule,
  ],
  providers: [RoleSeed, UserSeed],
})
export class MigrationModule {}
