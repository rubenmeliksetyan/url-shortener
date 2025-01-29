import {Controller, Post, Body} from '@nestjs/common';
import {UserService} from './user.service';

@Controller('api/auth')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('register')
    async register(@Body() body: { email: string; password: string; name: string }) {
        return this.userService.register(body.email, body.password, body.name);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.userService.validateUser(body.email, body.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const token = this.userService.generateJwt(user);
        return {token};
    }
}