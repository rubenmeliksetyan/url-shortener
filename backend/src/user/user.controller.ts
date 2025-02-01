import {Controller, Post, Body, UsePipes, ValidationPipe, UseFilters} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from '../common/dto/user.dto'
import {User} from './user.entity';
import {LoginDto} from '../common/dto/login.dto'

@Controller('api/auth')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() userDto: UserDto): Promise<User> {
        return this.userService.register(userDto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDto: LoginDto) {
        return this.userService.login(loginDto);
    }
}