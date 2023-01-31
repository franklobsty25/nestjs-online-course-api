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
import { NotificationModule } from './common/notification/notification.module';
import { CommentModule } from './comment/comment.module';
import { WebsocketModule } from './websocket/websocket.module';
import { EmployeeModule } from './employee/employee.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { OrganizationModule } from './organization/organization.module';
import { ReminderService } from './common/reminder/reminder.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(configuration().database),
    ScheduleModule.forRoot(),
    CourseModule,
    UserModule,
    AuthModule,
    UserModule,
    AuthModule,
    RoleModule,
    MigrationModule,
    NotificationModule,
    CommentModule,
    WebsocketModule,
    EmployeeModule,
    PaginationModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService, ReminderService],
})
export class AppModule {}
