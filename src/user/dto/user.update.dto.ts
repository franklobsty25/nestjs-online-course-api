import { OmitType, PartialType } from "@nestjs/swagger";
import { UserDTO } from "./user.dto";

export class UserUpdateDTO extends PartialType(OmitType(UserDTO, ['password'] as const)) {}