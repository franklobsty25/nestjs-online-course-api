import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    signup(@Body() input: UserDTO) {
        this.userService.create(input);
    }
}
