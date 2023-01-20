import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RoleCreateDTO {
    @ApiProperty({
        required: true,
        description: 'role name',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @Type(() => String)
    name: string;

    @ApiProperty({
        required: false,
        description: 'List of permissions'
    })
    @IsString()
    @IsArray()
    @IsNotEmpty()
    permissions: string[];
}