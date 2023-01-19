import { PickType } from "@nestjs/swagger";
import { UserDTO } from "src/user/dto/user.dto";

export class LoginDTO extends PickType(UserDTO, ['email', 'password'] as const) {}