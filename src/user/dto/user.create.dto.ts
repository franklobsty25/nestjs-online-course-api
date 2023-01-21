import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDTO {
  @ApiProperty({
    description: 'First name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly firstName: string;

  @ApiProperty({
    description: 'Last name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly lastName: string;

  @ApiProperty({
    description: 'Organization name',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  readonly organization?: string;

  @ApiProperty({
    description: 'Organization or personal contact',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(16)
  readonly phoneNumber: string;

  @ApiProperty({
    description: 'Organization email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'String password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minUppercase: 1
  })
  readonly password: string;
}
