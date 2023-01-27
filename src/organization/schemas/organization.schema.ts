import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { ORGANIZATION } from 'src/common/constants/schema.constant';
import { CourseDocument } from 'src/course/schemas/course.schema';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({ timestamps: true })
export class Organization {
  @Prop({
    required: true,
    maxLength: 100,
    trim: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    maxLength: 100,
    trim: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    maxLength: 100,
    trim: true,
    type: String,
  })
  category: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: ORGANIZATION,
  })
  courses: CourseDocument[];

  @Prop({
    default: false,
    type: Boolean,
  })
  isDeleted: boolean;

  @Prop({
    default: true,
    type: Boolean,
  })
  isActive: boolean;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
