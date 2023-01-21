import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ROLE_ENUM } from 'src/common/constants/role.enum.constant';
import { excludeUserPassword } from 'src/common/helpers/hide.password';
import { NotificationService } from 'src/common/notification/service/notification.service';
import { ResponseService } from 'src/common/response/response.service';
import { Role } from 'src/role/schemas/role.schema';
import { RoleService } from 'src/role/services/role.service';
import { UserAdminGuard } from '../decorators/user.admin.decorator';
import { GetUser } from '../decorators/user.decorator';
import { UserParam, UserParamGuard } from '../decorators/user.param.decorator';
import { UserChangePasswordDTO } from '../dto/user.change-password';
import { UserCreateDTO } from '../dto/user.create.dto';
import { UserRoleDTO } from '../dto/user.role.dto';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { User } from '../schemas/user.schema';
import { UserSerializer } from '../serialization/user.serialize';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger();

  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RoleService,
    private readonly responseService: ResponseService,
    private readonly notificationService: NotificationService,
  ) {}

  @Get('default')
  async creatDefaultAdmin(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const adminRole: Role = await this.rolesService.findOneByName(
        ROLE_ENUM.Admin,
      );
      const admin: User = await this.userService.createAdmin(adminRole);

      this.responseService.json(
        res,
        200,
        'Admin user created successfully',
        admin,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Post('register')
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body() input: UserCreateDTO,
  ): Promise<void> {
    try {
      const user: UserSerializer = await this.userService.create(input);

      const message: string = `
        Please click on the link ${req.protocol}://${req.get(
        'Host',
      )}/v1/users/verify?email=${user.email} \n
        To verify your email address for the registration. \n

        Thank you.

        Bento Technologies Limited
      `;
      this.logger.log(
        `${req.protocol}://${req.get('Host')}/v1/users/verify?email=`,
      );

      await this.notificationService.sendEmailNotification({
        email: user.email,
        subject: 'Email Verification',
        message: message,
      });

      this.responseService.json(res, 201, 'User created successfully', user);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async fetchUsers(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const users = await this.userService.findAllUsers();

      this.responseService.json(res, 200, 'Users found successfully', users);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  userProfile(@GetUser() user: User, @Res() res: Response): void {
    try {
      const serialize = excludeUserPassword(user);

      this.responseService.json(res, 200, 'User profile found', serialize);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changeUserPassword(
    @Req() req: Request,
    @Res() res: Response,
    @GetUser() user: User,
    @Body() input: UserChangePasswordDTO,
  ) {
    try {
      const userPasswordUpdated = await this.userService.changePassword(
        user,
        input,
      );

      this.responseService.json(
        res,
        201,
        'User password updated successfully',
        userPasswordUpdated,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UserParamGuard()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/active')
  async setActiveUser(
    @Req() req: Request,
    @Res() res: Response,
    @UserParam() user: User,
  ): Promise<void> {
    try {
      const activeUser: User = await this.userService.active(user);

      const serialize: UserSerializer = excludeUserPassword(activeUser);

      this.responseService.json(res, 201, 'User active', serialize);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UserParamGuard()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/inactive')
  async setInActiveUser(
    @Req() req: Request,
    @Res() res: Response,
    @UserParam() user: User,
  ): Promise<void> {
    try {
      const inactiveUser: User = await this.userService.inactive(user);

      const serialize: UserSerializer = excludeUserPassword(inactiveUser);

      this.responseService.json(res, 201, 'User inactive', serialize);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UserParamGuard()
  @UseGuards(JwtAuthGuard)
  @Put(':id/update')
  async updateUser(
    @UserParam() user: User,
    @Req() req: Request,
    @Res() res: Response,
    @Body() input: UserUpdateDTO,
  ): Promise<void> {
    try {
      const updatedUser: User = await this.userService.update(user, input);

      const serialize: UserSerializer = excludeUserPassword(updatedUser);

      this.responseService.json(
        res,
        201,
        'User profile updated successfully',
        serialize,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UserParamGuard()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async deleteUser(
    @UserParam() user: User,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const deletedUser: User = await this.userService.delete(user);

      const serialize: UserSerializer = excludeUserPassword(deletedUser);

      this.responseService.json(
        res,
        200,
        'User deleted successfully',
        serialize,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('role/update')
  async changeUserRole(
    @Req() req: Request,
    @Res() res,
    @Body() input: UserRoleDTO,
  ) {
    try {
      const user: UserSerializer = await this.userService.changeRole(
        input.email,
        input.role,
      );

      this.responseService.json(
        res,
        200,
        'User role changed successfully',
        user,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UserAdminGuard()
  @Patch(':id/status')
  async courseStatus() {
    this.logger.log('Approved course status');
  }

  @Get('verify')
  async verifyEmail(
    @Req() req: Request,
    @Res() res: Response,
    @Query('email') email: string,
  ) {
    try {
      const user: User = await this.userService.verifyEmail(email);

      const serialize: UserSerializer = excludeUserPassword(user);

      this.responseService.json(
        res,
        200,
        'Email verified successfully',
        serialize,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
