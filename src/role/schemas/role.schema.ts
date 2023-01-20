import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ROLE_ENUM } from "src/common/constants/role.enum.constant";
import { USER } from "src/common/constants/schema.constant";
import { User } from "src/user/schemas/user.schema";
import * as mongoose from "mongoose";

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true})
export class Role {
    @Prop({
        required: true,
        description: 'role name',
        type: String,
    })
    name: ROLE_ENUM;

    @Prop({
        required: true,
        default: [],
        description: 'permissions',
        type: Array<string>,
    })
    permissions: string[];

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

    @Prop({
        required: true,
        description: 'creator',
        index: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: USER,
    })
    creator: User;

}

export const RoleSchema = SchemaFactory.createForClass(Role);