import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { USER } from 'src/common/constants/schema.constant';
import { UserDocument } from 'src/user/schemas/user.schema';
import { COURSESTATUS } from '../types';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({
    required: true,
    maxLength: 100,
    trim: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    required: false,
    type: Number,
    default: 0.0,
  })
  price: number;

  @Prop({
    required: true,
    maxLength: 16,
    trim: true,
    type: String,
  })
  category: string;

  @Prop({
    required: false,
    index: true,
    type: String,
  })
  resourceUrl?: string;

  @Prop({
    required: false,
    index: true,
    type: String,
    default: COURSESTATUS.Pending,
  })
  status: COURSESTATUS;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: USER,
  })
  author: UserDocument;

  @Prop({
    required: true,
    default: false,
    type: Boolean,
  })
  isDeleted: boolean;

  @Prop({
    required: true,
    default: true,
    index: true,
    type: Boolean,
  })
  isActive: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
