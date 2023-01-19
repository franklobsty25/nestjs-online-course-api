import { Exclude } from "class-transformer";
import { User } from "../schemas/user.schema";

export class UserSerializer {
    readonly firstName: string;

    readonly lastName: string;

    readonly organization: string;

    readonly phoneNumber: string;

    readonly email: string;

    @Exclude()
    readonly password: string;

    readonly isDeleted: boolean;

    readonly isActive: boolean;
}