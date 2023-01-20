import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { USER } from "src/common/constants/schema";
import { User } from "src/user/schemas/user.schema";

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true})
export class Role {
    @Prop({
        required: true,
        description: 'Role name',
        type: String,
    })
    name: string;

    @Prop({
        required: true,
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
        default: true,
        type: Boolean,
    })
    isDeleted: boolean;

    @Prop({
        required: true,
        description: 'user reference',
        type: String,
        ref: USER,
    })
    user: User;

}

export const RoleSchema = SchemaFactory.createForClass(Role);