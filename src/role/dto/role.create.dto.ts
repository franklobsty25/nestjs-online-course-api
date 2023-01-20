import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ROLE_ENUM } from "src/common/constants/role.enum.constant";

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
    readonly name: ROLE_ENUM;

    @ApiProperty({
        required: false,
        description: 'List of permissions'
    })
    @IsString()
    @IsArray()
    @IsOptional()
    readonly permissions: string[];
}