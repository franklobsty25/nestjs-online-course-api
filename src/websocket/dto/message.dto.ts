import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageCreateDTO {
  @ApiProperty({
    required: true,
    description: 'create message from websocket',
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  message: string;
}
