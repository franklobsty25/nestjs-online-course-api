import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLE_ENUM } from 'src/common/constants/role.enum.constant';
import { USER } from 'src/common/constants/schema.constant';
import { User } from 'src/user/schemas/user.schema';
import * as mongoose from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({
    required: true,
    description: 'role name',
    enum: ROLE_ENUM,
    type: String,
  })
  name: ROLE_ENUM;

  @Prop({
    required: true,
    description: 'For approving or rejecting course content',
    type: String,
  })
  accessFor: string;

  @Prop({
    required: true,
    default: true,
    type: Boolean,
  })
  isActive: boolean;

  @Prop({
    required: true,
    default: false,
    type: Boolean,
  })
  isDeleted: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
