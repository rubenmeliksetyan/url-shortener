import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async register(email: string, password: string, name: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.name = name;

        return this.userRepository.save(user);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }

    // Generate JWT token
    generateJwt(user: User) {
        return jwt.sign(
            { id: user.id, email: user.email },
            'your_secret_key', // Use an environment variable for production
            { expiresIn: '1h' }
        );
    }
}