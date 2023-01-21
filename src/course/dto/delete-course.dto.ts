import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCourseDto {
  @ApiProperty({
    description: 'course id',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
