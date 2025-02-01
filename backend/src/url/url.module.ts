import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlService } from './url.service';
import {Url} from "./url.entity";
import {UrlController} from "./url.controller";
import {UserModule} from "../user/user.module";
import {VisitModule} from "../visit/visit.module";

@Module({
    imports: [TypeOrmModule.forFeature([Url]), UserModule, VisitModule],
    providers: [UrlService],
    controllers: [UrlController],
    exports: [UrlService],
})
export class UrlModule {}