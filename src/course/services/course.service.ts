import { UpdateCourseDto } from './../dto/update-course.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COURSE } from 'src/common/constants/schema';
import { S3Service } from 'src/common/s3/s3.service';
import { Course, CourseDocument } from '../schemas/course.schema';
import { InjectPaystack } from 'nestjs-paystack';
import paystack from 'paystack';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(COURSE) private courseModel: Model<CourseDocument>,
    private s3Service: S3Service,
    @InjectPaystack() private readonly paystackClient,
  ) {}

  async createCourse(body: any, file: Express.Multer.File): Promise<any> {
    const bucketKey = `${file.fieldname}${Date.now()}`;
    const resourceUrl = await this.s3Service.uploadFile(file, bucketKey);

    const newCourse = await this.courseModel.create({
      ...body,
      resourceUrl,
    });

    return newCourse;
  }

  async getAllCourses(): Promise<Course[]> {
    const courses = await this.courseModel.find({}).populate('author');
    return courses;
  }

  async getCourse(id: string): Promise<Course> {
    const course = await this.courseModel.findOne({ _id: id });
    return course;
  }

  async buyCourse(courseId: string, organizationId: string) {}

  async deleteCourse(id: string): Promise<Course> {
    const course = await this.courseModel.findOneAndDelete({ _id: id });
    return course;
  }

  async updateCourse(id: string, body: UpdateCourseDto): Promise<Course> {
    const filter = { _id: id };
    const update = { ...body };

    const course = await this.courseModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    return course;
  }
}
