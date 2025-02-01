import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from './common/filters/http-exception.filter';
import {TypeOrmExceptionFilter} from "./common/filters/typeorm-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new TypeOrmExceptionFilter());
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
