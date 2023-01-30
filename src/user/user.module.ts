import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/constants/schema.constant';
import { ResponseService } from 'src/common/response/response.service';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { RoleModule } from 'src/role/role.module';
import { NotificationService } from 'src/common/notification/service/notification.service';
import { FileHelperService } from 'src/common/helpers/file/file.helper.service';
import { ConfigModule } from '@nestjs/config';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER, schema: UserSchema }]),
    RoleModule,
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ResponseService,
    NotificationService,
    FileHelperService,
    PaginationService,
  ],
  exports: [UserService],
})
export class UserModule {}
