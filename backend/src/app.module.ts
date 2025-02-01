import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import {Url} from "./url/url.entity";
import {UrlModule} from "./url/url.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT as string) || 5432,
      username: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'url_shortener',
      entities: [User, Url],
      synchronize: true,
    }),
    UserModule,
    UrlModule,
  ],
})
export class AppModule {}