import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseService } from 'src/common/response/response.service';
import { S3Module } from 'src/common/s3/s3.module';
import { S3Service } from 'src/common/s3/s3.service';
import { CourseController } from './controllers/course.controller';
import { CourseSchema } from './schemas/course.schema';
import { CourseService } from './services/course.service';
import { PaystackModule } from 'nestjs-paystack';
import { COURSE } from 'src/common/constants/schema.constant';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: COURSE, schema: CourseSchema }]),
    S3Module,
    PaystackModule.forRoot({ apiKey: '' }),
  ],
  providers: [CourseService, ResponseService, S3Service],
  controllers: [CourseController],
})
export class CourseModule {}
