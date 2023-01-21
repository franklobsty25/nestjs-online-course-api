import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ROLE_ENUM } from 'src/common/constants/role.enum.constant';

export class UserRoleDTO {
  @ApiProperty({
    required: true,
    description: 'Email of user to change role',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  readonly email: string;

  @ApiProperty({
    required: true,
    description: 'Role name to assign to user',
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly role: ROLE_ENUM;
}
