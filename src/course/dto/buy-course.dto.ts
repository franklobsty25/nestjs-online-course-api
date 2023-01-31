import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BuyCourseDto {
  @ApiProperty({
    description: 'organization id',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  organization: string;

  @ApiProperty({
    description: 'id of courses bought',
    required: true,
  })
  courses: string[];

  @ApiProperty({
    description: 'customer email',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'total price',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
