import {
    Controller,
    Get,
    Param,
    Res,
    NotFoundException,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
    Body, UseGuards
} from '@nestjs/common';
import {Response} from 'express';
import {UrlService} from "./url.service";
import {CreateUrlDto, UpdateUrlDto} from "../common/dto/url.dto";
import {Url} from "./url.entity";
import {AuthGuard} from "../user/auth.guard";

@Controller('api/urls')
@UseGuards(AuthGuard)
export class UrlController {
    constructor(private readonly urlService: UrlService) {
    }

    @Get('resolve/:slug')
    async getOriginalUrl(@Param('slug') slug: string) {
        const url = await this.urlService.findBySlug(slug);
        if (!url) {
            throw new NotFoundException('URL not found');
        }
        return {originalUrl: url.originalUrl};
    }

    @Get(':slug')
    async redirectToOriginal(@Param('slug') slug: string, @Res() res: Response) {
        const url = await this.urlService.findBySlug(slug);
        if (!url) {
            throw new NotFoundException('URL not found');
        }
        return res.redirect(url.originalUrl);
    }

    @Post('slug')
    @UsePipes(new ValidationPipe())
    async createSlug(@Body() createUrlDto: CreateUrlDto): Promise<Url> {
        console.log(createUrlDto);
        return await this.urlService.createUrl(createUrlDto);
    }

    @Put(':user-id/slug')
    @UsePipes(new ValidationPipe())
    async updateSlug(@Param('user-id') userId: number,@Body() updateUrlDto: UpdateUrlDto): Promise<Url> {
        return await this.urlService.updateUrl(userId, updateUrlDto);
    }
}