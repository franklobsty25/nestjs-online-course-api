import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COURSE } from 'src/common/constants/schema';
import { Course, CourseDocument } from '../schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(COURSE) private courseModel: Model<CourseDocument>,
  ) {}

  async createCourse(data: any): Promise<any> {
    const newCourse = await this.courseModel.create({
      ...data,
    });
    return newCourse;
  }

  async getAllCourses(): Promise<Course[]> {
    const courses = await this.courseModel.find({}).populate('author');
    return courses;
  }

  async getCourse(id): Promise<Course> {
    const course = await this.courseModel.findOne({ _id: id });
    return course;
  }
}
