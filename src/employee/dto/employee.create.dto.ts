import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateEmployeeDTO {
    @ApiProperty({
        readOnly: true,
        description: 'employee firstname',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty({
        required: true,
        description: 'employee lastname',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty({
        required: true,
        description: 'employee email',
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        required: true,
        description: 'employee phone number',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    readonly phoneNumber: string;
}