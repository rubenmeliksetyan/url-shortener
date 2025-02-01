import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {TokenExpiredError} from "jsonwebtoken";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof TokenExpiredError) {
            status = HttpStatus.UNAUTHORIZED;
            message = 'Token has expired';
        }

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseBody = exception.getResponse();
            message = typeof responseBody === 'object' ? (responseBody as any).message : responseBody;
        }

        response.status(status).json({
            statusCode: status,
            message,
        });
    }
}