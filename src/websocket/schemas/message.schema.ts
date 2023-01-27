import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type MessageDocument = mongoose.HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({
    required: true,
    type: String,
  })
  message: string;

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

export const MessageSchema = SchemaFactory.createForClass(Message);
