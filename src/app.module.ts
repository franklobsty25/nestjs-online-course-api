import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import configuration from './common/env/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseService } from './common/response/response.service';
import { AuthModule } from './common/auth/auth.module';
import { CourseModule } from './course/course.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(configuration().database),
    CourseModule,
    UserModule,
    AuthModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule {}
