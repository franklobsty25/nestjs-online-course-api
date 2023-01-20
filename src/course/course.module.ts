import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE } from 'src/common/constants/schema';
import { ResponseService } from 'src/common/response/response.service';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';
import { CourseController } from './controllers/course.controller';
import { CourseSchema } from './schemas/course.schema';
import { CourseService } from './services/course.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COURSE, schema: CourseSchema }]),
    S3Module,
  ],
  providers: [CourseService, ResponseService, S3Service],
  controllers: [CourseController],
})
export class CourseModule {}
