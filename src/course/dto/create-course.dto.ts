import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { COURSESTATUS } from '../types';

export class CreateCourseDto {
  @ApiProperty({
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'description',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'course price',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'category',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
