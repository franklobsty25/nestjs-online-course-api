import { CourseService } from './../services/course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response, Express } from 'express';
import { ResponseService } from 'src/common/response/response.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteCourseDto } from '../dto/delete-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { COURSESTATUS } from '../types';

@Controller('courses')
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

  @Post('buy')
  async buyCourse(@Res() res: Response) {
    try {
      this.courseService.buyCourse('courseid', 'organization id');
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Get('list')
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

  @Get('/:id')
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

  @Delete('/:id/delete')
  async deleteCourse(
    @Res() res: Response,
    @Param() params: DeleteCourseDto,
  ): Promise<any> {
    try {
      const course = await this.courseService.deleteCourse(params.id);

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

  @Put('/:id/update')
  async updateCourse(
    @Res() res: Response,
    @Body() body: UpdateCourseDto,
    @Param() params: { id: string },
  ) {
    try {
      const updatedCourse = await this.courseService.updateCourse(
        params.id,
        body,
      );

      this.responseService.json(
        res,
        200,
        'course updated successfully',
        updatedCourse,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Put('/:id/update-status')
  async updateCourseStatus(
    @Res() res: Response,
    @Param() { id }: { id: string },
    @Body() { status }: { status: COURSESTATUS },
  ) {
    try {
      const updatedCourse = await this.courseService.updateCourseStatus(
        id,
        status,
      );

      this.responseService.json(
        res,
        200,
        `course ${status} successfully`,
        updatedCourse,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
