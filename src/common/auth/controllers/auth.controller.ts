import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseService } from 'src/common/response/response.service';
import { LoginDTO } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() input: LoginDTO,
  ): Promise<any> {
    try {
      const user = await this.authService.login(input);

      const token = await this.authService.signAuthPayload(user);

      this.responseService.json(res, 200, 'User logged successfully', token);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
