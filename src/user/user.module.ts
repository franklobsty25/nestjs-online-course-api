import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/constants/schema.constant';
import { ResponseService } from 'src/common/response/response.service';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { RoleModule } from 'src/role/role.module';
import { DB_CONNECTION } from 'src/common/constants/database.constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER, schema: UserSchema }], DB_CONNECTION),
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService, ResponseService],
  exports: [UserService],
})
export class UserModule {}
