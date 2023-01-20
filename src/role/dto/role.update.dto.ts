import { PartialType } from "@nestjs/swagger";
import { roleCreateDTO } from "./role.create.dto";

export class RoleUpdateDTO extends PartialType(roleCreateDTO) {}