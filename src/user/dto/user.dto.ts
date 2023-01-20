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

export class UserDTO {
  @ApiProperty({
    description: 'First name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    description: 'Organization name',
    required: false,
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  organization?: string;

  @ApiProperty({
    description: 'Organization or personal contact',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(16)
  phoneNumber: string;

  @ApiProperty({
    description: 'Organization email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Strong password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword()
  password: string;
}
