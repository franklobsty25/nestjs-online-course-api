import { CourseService } from './../services/course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response, Express } from 'express';
import { ResponseService } from 'src/common/response/response.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteCourseDto } from '../dto/delete-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { COURSESTATUS } from '../types';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { BuyCourseDto } from '../dto/buy-course.dto';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly courseService: CourseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createCourse(
    @Req() req: Request,
    @Res() res: Response,
    @GetUser() user: User,
    @Body() body: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      const newCourse = await this.courseService.createCourse(body, user, file);

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
  async buy(@Res() res: Response, @Body() data: BuyCourseDto) {
    try {
      this.courseService.buy(data);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Post('pay')
  async makePayment(@Res() res: Response, @Body() data: BuyCourseDto) {
    try {
      this.courseService.buy(data);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getCourse(
    @Res() res: Response,
    @Param() { id }: { id: string },
  ): Promise<any> {
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  // @UseGuards(JwtAuthGuard)
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
        `course status ${status}`,
        updatedCourse,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
