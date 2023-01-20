import { CourseService } from './../services/course.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import fs from 'fs';
import { Request, Response, Express } from 'express';
import { ResponseService } from 'src/common/response/response.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('course')
export class CourseController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly courseService: CourseService,
  ) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        // destination: (req, file, cb) => {
        //   const path = 'uploads/';
        //   fs.mkdirSync(path, { recursive: true });
        //   return cb(null, path);
        // },
        destination: 'uploads/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `${file.originalname}-${uniqueSuffix}${ext}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async createCourse(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      const newCourse = await this.courseService.createCourse({
        ...body,
        resourceUrl: file.path,
      });

      this.responseService.json(
        res,
        200,
        'course created successfully',
        newCourse,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Get('/list')
  async getCourses(@Res() res: Response): Promise<any> {
    try {
      const courses = await this.courseService.getAllCourses();
      this.responseService.json(
        res,
        200,
        'courses fetched successfully',
        courses,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Get('/list/:id')
  async getCourse(@Res() res: Response, @Param() id: string): Promise<any> {
    try {
      const course = await this.courseService.getCourse(id);
      this.responseService.json(
        res,
        200,
        'course fetched successfully',
        course,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
