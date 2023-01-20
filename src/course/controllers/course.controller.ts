import { CourseService } from './../services/course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response, Express } from 'express';
import { ResponseService } from 'src/common/response/response.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('course')
export class CourseController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly courseService: CourseService,
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createCourse(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      const newCourse = await this.courseService.createCourse(body, file);

      this.responseService.json(
        res,
        201,
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

  @Delete('/list/:id')
  async deleteCourse(@Res() res: Response, @Param() id: string): Promise<any> {
    try {
      const course = await this.courseService.deleteCourse(id);
      this.responseService.json(
        res,
        200,
        'course deleted successfully',
        course,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
