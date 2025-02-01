import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlService } from './url.service';
import {Url} from "./url.entity";
import {UrlController} from "./url.controller";
import {UserModule} from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Url]), UserModule],
    providers: [UrlService],
    controllers: [UrlController],
    exports: [UrlService],
})
export class UrlModule {}