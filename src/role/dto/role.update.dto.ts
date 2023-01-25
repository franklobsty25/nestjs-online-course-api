import { PartialType } from '@nestjs/swagger';
import { RoleCreateDTO } from './role.create.dto';

export class RoleUpdateDTO extends PartialType(RoleCreateDTO) {}
