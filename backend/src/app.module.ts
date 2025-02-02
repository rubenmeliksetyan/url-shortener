import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import {Url} from "./url/url.entity";
import {UrlModule} from "./url/url.module";
import {VisitModule} from "./visit/visit.module";
import {Visit} from "./visit/visit.entity";
import {RateLimiterModule} from "nestjs-rate-limiter";

@Module({
  imports: [
    RateLimiterModule.register({
      points: 10,
      duration: 60,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'postgres_db',
      port: parseInt(process.env.DATABASE_PORT as string) || 5432,
      username: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'url_shortener',
      entities: [User, Url, Visit],
      synchronize: true,
    }),
    UserModule,
    UrlModule,
    VisitModule
  ],
})
export class AppModule {}