import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';
import {UserDto} from "../common/dto/user.dto";
import {LoginDto} from "../common/dto/login.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async register(userDto: UserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const user = new User();
        user.email = userDto.email;
        user.password = hashedPassword;
        user.name = userDto.name;

        return await this.userRepository.save(user)
    }

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });

        if (!user) {
            throw new HttpException('Invalid credentials', 422);
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid credentials', 422);
        }

        const token = this.generateJwt(user)

        return { token };
    }

    private generateJwt(user: User) {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
    }
}