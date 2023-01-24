import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { USER } from 'src/common/constants/schema.constant';
import { User } from 'src/user/schemas/user.schema';

export type CommentDocument = mongoose.HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    required: true,
    type: String,
  })
  comment: string;

  @Prop({
    required: true,
    index: true,
    ref: USER,
    type: mongoose.Schema.Types.ObjectId,
  })
  creator: User;

  @Prop({
    required: true,
    default: false,
    type: Boolean,
  })
  isDeleted: boolean;

  @Prop({
    required: true,
    default: true,
    type: Boolean,
  })
  isActive: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
