import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthAccessGuard } from 'src/common/auth/guards/jwt-auth-access.guard';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { MetaData } from 'src/common/pagination/interface/meta_interface';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { ResponseService } from 'src/common/response/response.service';
import { GetUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { GetComment } from '../decorators/comment.decorator';
import { CommentFromParamGuard } from '../decorators/comment.from-param.decorator';
import { CommentCreateDTO } from '../dto/comment.create.dto';
import { CommentUpdateDTO } from '../dto/comment.update.dto';
import { CommentDocument } from '../schemas/comment.schema';
import { CommentService } from '../services/comment.service';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly responseService: ResponseService,
    private readonly paginationService: PaginationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createComment(
    @Req() req: Request,
    @Res() res: Response,
    @GetUser() user: User,
    @Body() input: CommentCreateDTO,
  ): Promise<void> {
    try {
      const comment: CommentDocument = await this.commentService.create(
        user,
        input,
      );

      this.responseService.json(
        res,
        201,
        'Comment created successfully',
        comment,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async findComments(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: { page: number; perPage: number; search: string },
  ): Promise<void> {
    try {
      const { page, perPage, search } = query;
      const skip: number = await this.paginationService.skip(page, perPage);
      const comments: CommentDocument[] = await this.commentService.findAll(
        perPage,
        skip,
      );
      const totalData: number = await this.commentService.getAllTotals();
      const totalPages: number = await this.paginationService.totalPage(
        totalData,
        perPage,
      );

      const meta: MetaData = { totalData, totalPages, page, perPage };

      this.responseService.json(
        res,
        200,
        'comments found successfully',
        comments,
        meta,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: { page: number; perPage: number; search: string },
  ): Promise<void> {
    try {
      const { page, perPage, search } = query;
      const skip: number = await this.paginationService.skip(page, perPage);
      const comments: CommentDocument[] = await this.commentService.find(
        search,
        perPage,
        skip,
      );
      const totalData: number = await this.commentService.getTotal(search);
      const totalPages: number = await this.paginationService.totalPage(
        totalData,
        perPage,
      );

      const meta: MetaData = { totalData, totalPages, page, perPage };

      this.responseService.json(
        res,
        200,
        'Comments found successfully',
        comments,
        meta,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @CommentFromParamGuard()
  @UseGuards(JwtAuthAccessGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findComment(
    @Req() req: Request,
    @Res() res: Response,
    @GetComment() comment: CommentDocument,
  ): Promise<void> {
    try {
      this.responseService.json(res, 200, 'Comment found', comment);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @CommentFromParamGuard()
  @UseGuards(JwtAuthAccessGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id/update')
  async updateComment(
    @Req() req: Request,
    @Res() res: Response,
    @GetComment() comment: CommentDocument,
    @Body() input: CommentUpdateDTO,
  ): Promise<void> {
    try {
      const commentDoc: CommentDocument = await this.commentService.update(
        comment,
        input,
      );

      this.responseService.json(
        res,
        200,
        'Comment updated successfully',
        commentDoc,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @CommentFromParamGuard()
  @UseGuards(JwtAuthAccessGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async deleteComment(
    @Req() req: Request,
    @Res() res: Response,
    @GetComment() comment: CommentDocument,
  ): Promise<void> {
    try {
      const commentDoc: CommentDocument = await this.commentService.delete(
        comment,
      );

      this.responseService.json(
        res,
        200,
        'Comment deleted successfully',
        commentDoc,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @CommentFromParamGuard()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/active')
  async active(
    @Req() req: Request,
    @Res() res: Response,
    @GetComment() comment: CommentDocument,
  ): Promise<void> {
    try {
      const commentDoc: CommentDocument = await this.commentService.active(
        comment,
      );

      this.responseService.json(res, 200, 'Comment is active', commentDoc);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @CommentFromParamGuard()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/inactive')
  async inActive(
    @Req() req: Request,
    @Res() res: Response,
    @GetComment() comment: CommentDocument,
  ): Promise<void> {
    try {
      const commentDoc: CommentDocument = await this.commentService.inactive(
        comment,
      );

      this.responseService.json(res, 200, 'Comment is active', commentDoc);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @CommentFromParamGuard()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/soft-delete')
  async softDelete(
    @Req() req: Request,
    @Res() res: Response,
    @GetComment() comment: CommentDocument,
  ): Promise<void> {
    try {
      const commentDoc: CommentDocument = await this.commentService.softDelete(
        comment,
      );

      this.responseService.json(res, 200, 'Comment is active', commentDoc);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
