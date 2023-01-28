import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PayDto {
  @ApiProperty({
    description: '',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
