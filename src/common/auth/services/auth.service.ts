import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { verifyPassword } from 'src/common/helpers/hash.password';
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
    const { email, password } = loginDTO;

    const user: User = await this.userService.findByEmail(email);

    if (!user) throw new NotFoundException(`User with ${ email } not found`);

    const validPassword: boolean = await verifyPassword(password, user.password);

    if (!validPassword)
      throw new UnauthorizedException(`User with ${ email } not authorized`);

    return user;
  }
}
