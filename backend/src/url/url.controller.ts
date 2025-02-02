import {
    Controller,
    Get,
    NotFoundException,
    Post,
    UsePipes,
    ValidationPipe,
    Body, UseGuards, Req, Patch, Param,
} from '@nestjs/common';
import {UrlService} from "./url.service";
import {CreateUrlDto} from "../common/dto/url.dto";
import {Url} from "./url.entity";
import {AuthGuard} from "../user/auth.guard";
import {VisitService} from "../visit/visit.service";

@Controller('api/urls')
@UseGuards(AuthGuard)
export class UrlController {
    constructor(
        private readonly urlService: UrlService,
        private readonly visitService: VisitService
    ) {
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createSlug(
        @Body() createUrlDto: CreateUrlDto,
        @Req() req
    ): Promise<Url> {
        createUrlDto.userId = req.user.id
        return await this.urlService.createUrl(createUrlDto);
    }

    @Get()
    async getUserUrls(@Req() req) {
        const userId = req.user.id;
        return this.urlService.findByUserId(userId);
    }

    @Patch(':slug')
    async updateSlug(
        @Param('slug') currentSlug: string,
        @Body() body: { slug: string },
        @Req() req
    ): Promise<Url> {
        const userId = req.user.id;
        return this.urlService.updateSlug(currentSlug, body.slug, Number(userId));
    }

    @Get(':slug')
    async redirectToOriginal(@Param('slug') slug: string) {
        console.log(`🔍 Received request for slug: ${slug} at ${new Date().toISOString()}`);
        const url = await this.urlService.findBySlug(slug);
        if (!url) {
            throw new NotFoundException('URL not found');
        }
        await this.visitService.trackVisit(url)

        return {originalUrl: url.originalUrl};
    }

    @Get(':slug/stats')
    async getStats(@Param('slug') slug: string) {
        return await this.urlService.getUrlStats(slug);
    }
}