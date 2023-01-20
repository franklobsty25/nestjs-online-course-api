import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

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
    maxLength: 100,
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
  })
  password: string;

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

export const UserSchema = SchemaFactory.createForClass(User);
