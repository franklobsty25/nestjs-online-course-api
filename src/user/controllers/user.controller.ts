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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthAccessGuard } from 'src/common/auth/guards/jwt-auth-access.guard';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { IFile } from 'src/common/constants/file.enum.constant';
import { ROLE_ENUM } from 'src/common/constants/role.enum.constant';
import { FileHelperService } from 'src/common/helpers/file/file.helper.service';
import { FileExtractPipe } from 'src/common/helpers/file/pipes/file.extract.pipe';
import { FileRequiredPipe } from 'src/common/helpers/file/pipes/file.required.pipe';
import { FileTypeExcelPipe } from 'src/common/helpers/file/pipes/file.type.pipe';
import { NotificationService } from 'src/common/notification/service/notification.service';
import { MetaData } from 'src/common/pagination/interface/meta_interface';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { ResponseService } from 'src/common/response/response.service';
import { Role } from 'src/role/schemas/role.schema';
import { RoleService } from 'src/role/services/role.service';
import { GetUser } from '../decorators/user.decorator';
import { UserParam, UserParamGuard } from '../decorators/user.param.decorator';
import { UserChangePasswordDTO } from '../dto/user.change-password';
import { UserCreateDTO } from '../dto/user.create.dto';
import { UserRoleDTO } from '../dto/user.role.dto';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { UserAdminAccessGuard } from '../guards/user.admin-access.guard';
import { IUser } from '../interface/user.interface';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@ApiTags('User')
@ApiBearerAuth('Bearer Token')
@Controller('users')
export class UserController {
  private readonly logger = new Logger();

  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RoleService,
    private readonly responseService: ResponseService,
    private readonly fileHelperService: FileHelperService,
    private readonly paginationService: PaginationService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post('default')
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
      const user: IUser = await this.userService.create(input);

      const message = `
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
  async fetchUsers(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: { page: number; perPage: number; search: string },
  ): Promise<void> {
    try {
      const { page, perPage } = query;
      const skip: number = await this.paginationService.skip(page, perPage);
      const users: User[] = await this.userService.findAllUsers(perPage, skip);
      const totalData: number = await this.userService.getTotalUsers();
      const totalPages: number = await this.paginationService.totalPage(
        totalData,
        perPage,
      );
      const meta: MetaData = { totalData, totalPages, page, perPage };
      this.responseService.json(
        res,
        200,
        'Users found successfully',
        users,
        meta,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  userProfile(@GetUser() user: User, @Res() res: Response): void {
    try {
      this.responseService.json(res, 200, 'User profile found', user);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: { page: number; perPage: number; search: string },
  ): Promise<void> {
    try {
      const { page, perPage, search } = query;
      const skip: number = await this.paginationService.skip(page, perPage);
      const users: User[] = await this.userService.find(search, perPage, skip);
      const totalData: number = await this.userService.getTotalUser(search);
      const totalPages: number = await this.paginationService.totalPage(
        totalData,
        perPage,
      );
      console.log(users);

      const meta: MetaData = { totalData, totalPages, page, perPage };

      this.responseService.json(
        res,
        200,
        'Users found successfully',
        users,
        meta,
      );
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
  ): Promise<void> {
    try {
      const userPasswordUpdated: User = await this.userService.changePassword(
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

      this.responseService.json(res, 201, 'User active', activeUser);
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

      this.responseService.json(res, 201, 'User inactive', inactiveUser);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(
    @GetUser() user: User,
    @Req() req: Request,
    @Res() res: Response,
    @Body() input: UserUpdateDTO,
  ): Promise<void> {
    try {
      const updatedUser: User = await this.userService.update(user, input);

      this.responseService.json(
        res,
        201,
        'User profile updated successfully',
        updatedUser,
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

      this.responseService.json(
        res,
        200,
        'User deleted successfully',
        deletedUser,
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
  ): Promise<void> {
    try {
      const user: User = await this.userService.changeRole(
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

  @UseGuards(UserAdminAccessGuard)
  @UseGuards(JwtAuthAccessGuard)
  @Patch('/status')
  async courseStatus(): Promise<void> {
    this.logger.log('Approved course status');
  }

  @Get('verify')
  async verifyEmail(
    @Req() req: Request,
    @Res() res: Response,
    @Query('email') email: string,
  ): Promise<void> {
    try {
      const user: User = await this.userService.verifyEmail(email);

      this.responseService.json(res, 200, 'Email verified successfully', user);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(UserAdminAccessGuard)
  @UseGuards(JwtAuthAccessGuard)
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async import(
    @UploadedFile(FileRequiredPipe, FileTypeExcelPipe, FileExtractPipe)
    file: IFile,
  ): Promise<any> {
    return { file };
  }

  @UseGuards(UserAdminAccessGuard)
  @UseGuards(JwtAuthAccessGuard)
  @Post('export')
  async export(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const users: User[] = await this.userService.findAllUsers();

      const userValues: Record<string, any>[] = users.map((user) => user);

      const workbook = this.fileHelperService.createExcelWorkbook(userValues);

      const result = this.fileHelperService.writeExcelToBuffer(workbook);

      this.responseService.json(res, 200, 'File exported', result);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
