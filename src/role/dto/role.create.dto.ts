import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  ROLE_ENUM,
  ROLE_ENUM_ACCESS_FOR,
} from 'src/common/constants/role.enum.constant';

export class RoleCreateDTO {
  @ApiProperty({
    required: true,
    description: 'role name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Type(() => String)
  readonly name: ROLE_ENUM;
}
