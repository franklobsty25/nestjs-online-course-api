import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { COMMENT } from 'src/common/constants/schema.constant';
import { ResponseService } from 'src/common/response/response.service';
import { UserModule } from 'src/user/user.module';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: COMMENT,
        schema: CommentSchema,
      },
    ]),
    UserModule,
  ],
  providers: [CommentService, ResponseService, PaginationService],
  controllers: [CommentController],
})
export class CommentModule {}
