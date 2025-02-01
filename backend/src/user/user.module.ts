import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import {JwtModule} from "@nestjs/jwt";
import {AuthGuard} from "./auth.guard";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [UserService, AuthGuard],
    controllers: [UserController],
    exports: [UserService, TypeOrmModule, JwtModule, AuthGuard],
})
export class UserModule {}