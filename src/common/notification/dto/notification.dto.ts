import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificationDto {
  @ApiProperty({ description: 'recipient email address', required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'subject of the message to send',
    required: false,
  })
  @IsOptional()
  @IsString()
  subject: string;

  @ApiProperty({ description: 'message body to send to the recipient' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
