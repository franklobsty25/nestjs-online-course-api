import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE } from 'src/common/constants/schema';
import { ResponseService } from 'src/common/response/response.service';
import { CourseController } from './controllers/course.controller';
import { CourseSchema } from './schemas/course.schema';
import { CourseService } from './services/course.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COURSE, schema: CourseSchema }]),
  ],
  providers: [CourseService, ResponseService],
  controllers: [CourseController],
})
export class CourseModule {}
