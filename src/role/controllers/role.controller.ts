import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ResponseService } from 'src/common/response/response.service';
import { GetUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { RoleCreateDTO } from '../dto/role.create.dto';
import { RoleService } from '../services/role.service';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly responseService: ResponseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @GetUser() user: User,
    @Body() input: RoleCreateDTO,
  ) {
    try {
      const role = await this.roleService.create(user, input);

      this.responseService.json(res, 201, 'Role created successfully', role);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
