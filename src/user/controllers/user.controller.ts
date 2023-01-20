import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ResponseService } from 'src/common/response/response.service';
import { GetUser } from '../decorators/user.decorator';
import { UserParam, UserParamGuard } from '../decorators/user.param.decorator';
import { UserCreateDTO } from '../dto/user.create.dto';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { User } from '../schemas/user.schema';
import { UserSerializer } from '../serialization/user.serialize';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('register')
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body() input: UserCreateDTO,
  ): Promise<void> {
    try {
      const user: UserSerializer = await this.userService.create(input);

      //@TODO: Email verification notification to mail

      this.responseService.json(res, 201, 'User created successfully', user);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
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
      this.responseService.json(res, 200, 'User profile found', user);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @UserParamGuard()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateUser(
    @UserParam() user: User,
    @Req() req: Request,
    @Res() res: Response,
    @Body() input: UserUpdateDTO,
  ): Promise<void> {
    try {
      const updatedUser = await this.userService.update(user, input);

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
  @Delete('/:id')
  async deleteUser(
    @UserParam() user: User,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const deletedUser = await this.userService.delete(user);

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
}
