import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { COMMENT } from 'src/common/constants/schema.constant';
import { DB_CONNECTION } from 'src/common/constants/database.constant';
import { ResponseService } from 'src/common/response/response.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: COMMENT,
        schema: CommentSchema,
      },
    ], DB_CONNECTION),
  ],
  providers: [CommentService, ResponseService],
  controllers: [CommentController],
})
export class CommentModule {}
