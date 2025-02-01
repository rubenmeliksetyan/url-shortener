import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Invalid authentication token');
        }

        try {
            request['user'] = this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET as string,
                }
            );
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}