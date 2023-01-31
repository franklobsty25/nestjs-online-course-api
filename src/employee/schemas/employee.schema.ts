import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { COURSE, ROLE } from 'src/common/constants/schema.constant';
import { Role } from 'src/role/schemas/role.schema';
import * as mongoose from 'mongoose';
import { Course } from 'src/course/schemas/course.schema';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true })
export class Employee {
  @Prop({
    required: true,
    maxLength: 100,
    trim: true,
    type: String,
  })
  firstName: string;

  @Prop({
    required: true,
    maxLength: 100,
    trim: true,
    type: String,
  })
  lastName: string;

  @Prop({
    required: true,
    maxLength: 16,
    trim: true,
    type: String,
  })
  phoneNumber: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
    type: String,
  })
  email: string;

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

  // @Prop({
  //   required: false,
  //   trim: true,
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: ORGANIZATION,
  // })
  // organization: Organization;

  // @Prop({
  //   required: true,
  //   index: true,
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: COURSE,
  // })
  // course: Course;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
