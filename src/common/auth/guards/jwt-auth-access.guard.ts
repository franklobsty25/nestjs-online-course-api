import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthAccessGuard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(err: Error, user: TUser, info: Error): TUser {
        if (err || !user) {
            throw new UnauthorizedException({
                statusCode:
                    401,
                message: 'Unauthorized token',
                error: err ? err.message : info.message,
            });
        }

        return user;
    }
}