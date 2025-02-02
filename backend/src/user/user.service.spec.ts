import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserDto } from '../common/dto/user.dto';
import { LoginDto } from '../common/dto/login.dto';
import { HttpException } from '@nestjs/common';

beforeEach(() => {
    process.env.JWT_SECRET = 'mock_secret_key'; // ✅ Manually set a secret for Jest
});
jest.mock('bcryptjs');
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mock_token'),
}));

describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        findOne: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    // ✅ Test: register()
    it('should hash password and save user', async () => {
        const userDto: UserDto = { email: 'test@example.com', password: 'password123', name: 'Test User' };
        const hashedPassword = 'hashed_password';

        jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
        jest.spyOn(userRepository, 'save').mockResolvedValue({
            ...userDto,
            id: 1,
            password: hashedPassword,
        } as User);

        const result = await userService.register(userDto);
        expect(result).toHaveProperty('id');
        expect(result.password).toBe(hashedPassword);
        expect(userRepository.save).toHaveBeenCalled();
    });

    // ✅ Test: login() - Success
    it('should return a JWT token when credentials are valid', async () => {
        const loginDto: LoginDto = { email: 'test@example.com', password: 'password123' };
        const user: User = { id: 1, email: loginDto.email, password: 'hashed_password', name: 'Test User', urls: [] };

        jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

        const result = await userService.login(loginDto);

        expect(result).toEqual({ token: 'mock_token' });
        expect(jwt.sign).toHaveBeenCalledTimes(1);
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: 1, email: 'test@example.com' },
            expect.any(String),
            { expiresIn: '24h' }
        );
    });

    // ✅ Test: login() - Invalid email
    it('should throw an error if email is not found', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

        await expect(userService.login({ email: 'invalid@example.com', password: 'password123' }))
            .rejects.toThrow(new HttpException('Invalid credentials', 422));
    });

    // ✅ Test: login() - Invalid password
    it('should throw an error if password is incorrect', async () => {
        const loginDto: LoginDto = { email: 'test@example.com', password: 'wrong_password' };
        const user: User = { id: 1, email: loginDto.email, password: 'hashed_password', name: 'Test User', urls: [] };

        jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

        await expect(userService.login(loginDto)).rejects.toThrow(new HttpException('Invalid credentials', 422));
    });
});