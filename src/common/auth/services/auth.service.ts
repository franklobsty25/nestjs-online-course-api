import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/services/user.service';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    const validPassword = compare(password, user.password);

    if (!validPassword) return null;

    return user;
  }

  async signAuthPayload(user: any) {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }

  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.findByEmail(loginDTO.email);

    if (!user) throw new NotFoundException();

    const validPassword = compare(loginDTO.password, user.password);

    if (!validPassword) throw new UnauthorizedException();

    return user;
  }
}
