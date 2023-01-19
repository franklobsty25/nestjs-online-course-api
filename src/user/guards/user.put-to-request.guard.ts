import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { User } from "../schemas/user.schema";
import { UserService } from "../services/user.service";

@Injectable()
export class UserPutToRequestGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { params } = request;

        const check: User = await this.userService.findById(params.id);
        request.__user = check;

        return true;
    }
}