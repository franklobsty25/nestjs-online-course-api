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
import { RoleModule } from './role/role.module';
import { MigrationModule } from './common/migration/migration.module';
import { DB_CONNECTION } from './common/constants/database.constant';
import { NotificationModule } from './common/notification/notification.module';
import { CommentModule } from './comment/comment.module';
import { WebsocketModule } from './websocket/websocket.module';

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
    MongooseModule.forRoot(configuration().database, {
      connectionName: DB_CONNECTION,
    }),
    UserModule,
    AuthModule,
    RoleModule,
    MigrationModule,
    NotificationModule,
    CommentModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule {}
