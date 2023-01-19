import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/constants/schema';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
