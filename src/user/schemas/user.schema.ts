import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLE } from 'src/common/constants/schema.constant';
import { Role } from 'src/role/schemas/role.schema';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
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
    required: false,
    trim: true,
    type: String,
  })
  organization: string;

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
    type: String,
    select: false,
  })
  password: string;

  @Prop({
    required: true,
    default: false,
    type: Boolean,
  })
  emailVerification: boolean;

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

  @Prop({
    required: true,
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: ROLE,
  })
  role: Role;

}

export const UserSchema = SchemaFactory.createForClass(User);
