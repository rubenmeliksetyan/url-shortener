import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Catch()
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        // TypeORM QueryFailedError (e.g., unique constraint violation)
        if (exception instanceof QueryFailedError) {
            status = HttpStatus.BAD_REQUEST;
            message = (exception as any).message || 'Database query error';
        }

        // Entity Not Found Error
        if (exception instanceof EntityNotFoundError) {
            status = HttpStatus.NOT_FOUND;
            message = 'Entity not found';
        }

        // Handle NestJS HttpException (e.g., manually thrown errors)
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseBody = exception.getResponse();
            if (typeof responseBody === 'object' && responseBody !== null) {
                message = (responseBody as Record<string, any>).message || 'An error occurred';
            } else {
                message = responseBody as string;
            }
        }

        response.status(status).json({
            statusCode: status,
            message,
        });
    }
}