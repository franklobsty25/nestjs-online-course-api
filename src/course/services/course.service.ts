import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import { UpdateCourseDto } from './../dto/update-course.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COURSE } from 'src/common/constants/schema';
import { S3Service } from 'src/common/s3/s3.service';
import { Course, CourseDocument } from '../schemas/course.schema';
import { COURSESTATUS } from '../types';
import fetch from 'node-fetch';
@Injectable()
export class CourseService {
  constructor(
    @InjectModel(COURSE) private courseModel: Model<CourseDocument>,
    private s3Service: S3Service,
    private configService: ConfigService,
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

    if (!course) {
      throw new NotFoundException('invalid course id');
    }

    return course;
  }

  async buyCourse(): Promise<any> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.get(
          'PAYSTACK_PUBLIC_KEY',
        )}`,
      },
      body: JSON.stringify({
        email: 'ybenson96@gmail.com',
        amount: '20000',
      }),
    };

    fetch('https://api.paystack.co/transaction/initialize', requestOptions)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      });
  }

  async deleteCourse(id: string): Promise<Course> {
    const course = await this.courseModel.findOneAndDelete({ _id: id });

    if (!course) {
      throw new NotFoundException('invalid course id');
    }
    return course;
  }

  async updateCourse(id: string, body: UpdateCourseDto): Promise<Course> {
    const filter = { _id: id };
    const update = { ...body };

    const course = await this.courseModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!course) {
      throw new NotFoundException('invalid course id');
    }

    return course;
  }

  async updateCourseStatus(id: string, status: COURSESTATUS): Promise<Course> {
    const filter = { _id: id };
    const update = { status };

    const course = await this.courseModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!course) {
      throw new NotFoundException('invalid course id');
    }

    return course;
  }
}
