import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ResponseService } from 'src/common/response/response.service';
import { GetRole } from '../decorators/role.decorator';
import { RoleParamGuard } from '../decorators/role.param.decorator.';
import { RoleCreateDTO } from '../dto/role.create.dto';
import { RoleUpdateDTO } from '../dto/role.update.dto';
import { Role } from '../schemas/role.schema';
import { RoleService } from '../services/role.service';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly responseService: ResponseService,
  ) {}

  @Get('default')
  async createDefaultData(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const createdRoles: any = await this.roleService.createDefaultRoles();

      this.responseService.json(res, 200, 'Dummy data created', createdRoles);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() input: RoleCreateDTO,
  ): Promise<void> {
    try {
      const role = await this.roleService.create(input);

      this.responseService.json(res, 201, 'Role created successfully', role);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async fetchRoles(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const roles: Role[] = await this.roleService.findAll();

      this.responseService.json(res, 200, 'Roles found successfully', roles);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @RoleParamGuard()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getRole(
    @Req() req: Request,
    @Res() res: Response,
    @GetRole() role: Role,
  ): void {
    this.responseService.json(res, 200, 'Role found successfully', role);
  }

  @RoleParamGuard()
  @UseGuards(JwtAuthGuard)
  @Put(':id/update')
  async updateRoles(
    @Req() req: Request,
    @Res() res: Response,
    @GetRole() role: Role,
    @Body() input: RoleUpdateDTO,
  ): Promise<void> {
    try {
      const newRole: Role = await this.roleService.update(role, input);

      this.responseService.json(res, 200, 'Role updated successfully', newRole);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @RoleParamGuard()
  @Patch(':id/active')
  async activeRole(
    @Req() req: Request,
    @Res() res: Response,
    @GetRole() role: Role,
  ): Promise<void> {
    try {
      const activeRole = await this.roleService.active(role);

      this.responseService.json(res, 200, 'Role activate', activeRole);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @RoleParamGuard()
  @Patch(':id/inactive')
  async inActiveRole(
    @Req() req: Request,
    @Res() res: Response,
    @GetRole() role: Role,
  ): Promise<void> {
    try {
      const inActiveRole = await this.roleService.inactive(role);

      this.responseService.json(res, 200, 'Role inactive', inActiveRole);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @RoleParamGuard()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async deleteRoles(
    @Req() req: Request,
    @Res() res: Response,
    @GetRole() role: Role,
  ): Promise<void> {
    try {
      const deleted = await this.roleService.delete(role);

      this.responseService.json(res, 200, 'Role deleted successfully', deleted);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
