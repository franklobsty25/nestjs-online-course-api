import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { COURSESTATUS } from '../types';

export class UpdateCourseDto {
  @ApiProperty({
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'description',
    required: true,
  })
  @IsString()
  @IsOptional()
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
  @IsOptional()
  category: string;

  @ApiProperty({
    description: 'resource',
    required: true,
  })
  @IsString()
  @IsOptional()
  resourceUrl: string;

  @ApiProperty({
    description: 'status',
    required: true,
    default: COURSESTATUS.Pending,
  })
  @IsString()
  @IsOptional()
  status: COURSESTATUS;
}
