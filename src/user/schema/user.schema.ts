import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ index: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
