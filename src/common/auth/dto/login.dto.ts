import { PickType } from "@nestjs/swagger";
import { UserCreateDTO } from "src/user/dto/user.create.dto";

export class LoginDTO extends PickType(UserCreateDTO, ['email', 'password'] as const) {}