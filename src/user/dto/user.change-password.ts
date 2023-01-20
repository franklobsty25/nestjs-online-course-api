import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { UserCreateDTO } from "./user.create.dto";

export class UserChangePasswordDTO extends PickType(UserCreateDTO, ['password'] as const) {
    @ApiProperty({
        required: true,
        description: 'old password for registration',
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1,
    })
    oldPassword: string;

    @ApiProperty({
        required: true,
        description: 'confirma password to match new password',
    })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minSymbols: 1,
        minUppercase: 1,
    })
    confirmPassword: string;
}