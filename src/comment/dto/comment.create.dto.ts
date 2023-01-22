import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CommentCreateDTO {
    @ApiProperty({
        required: true,
        description: 'Comment on course content',
    })
    @Type(() => String)
    @IsString()
    @IsNotEmpty()
    comment: string;
}