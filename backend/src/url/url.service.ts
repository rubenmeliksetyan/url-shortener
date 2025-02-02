import {Injectable, NotFoundException, ConflictException, Req, ForbiddenException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as crypto from 'crypto';
import {Url} from "./url.entity";
import {User} from "../user/user.entity";
import {CreateUrlDto} from "../common/dto/url.dto";
import {VisitService} from "../visit/visit.service";

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private readonly urlRepository: Repository<Url>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly visitService: VisitService
    ) {
    }

    async findByUserId(userId: number): Promise<Url[]> {
        return this.urlRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
            select: ['id', 'slug', 'originalUrl'],
        });
    }

    async createUrl(createUrlDto: CreateUrlDto): Promise<Url> {
        const { originalUrl, userId } = createUrlDto;
        let { slug } = createUrlDto;

        if (slug && await this.urlRepository.findOne({ where: { slug } })) {
            throw new ConflictException('Slug is already in use');
        }

        while (!slug || await this.urlRepository.findOne({ where: { slug } })) {
            slug = crypto.createHash('md5').update(originalUrl).digest('hex').substring(0, 6);
        }

        return await this.urlRepository.save(
            this.urlRepository.create({ originalUrl, slug, user: { id: userId } })
        );

    }

    async updateSlug(currentSlug: string, newSlug: string, userId: number) {

        const url = await this.urlRepository.findOne({
            where: { slug: currentSlug },
            relations: ['user'],
        });

        if (!url) {
            throw new NotFoundException('URL not found');
        }
        if (url.user.id !== userId) {
            throw new ForbiddenException('You do not have permission to edit this URL');
        }

        const existingUrl = await this.urlRepository.findOne({ where: { slug: newSlug } });
        if (existingUrl) {
            throw new ForbiddenException('Slug is already in use');
        }

        url.slug = newSlug;
        return this.urlRepository.save(url);
    }

    async findBySlug(slug: string): Promise<Url | null> {
        const url = await this.urlRepository.findOne({where: {slug}});
        if (!url) {
            throw new NotFoundException('URL not found');
        }
        await this.visitService.trackVisit(url);

        return url;
    }

    async getUrlStats(slug: string) {
        const url = await this.urlRepository.findOne({
            where: { slug },
            relations: ['visits'],
        });

        if (!url) {
            throw new NotFoundException('URL not found');
        }

        return {
            originalUrl: url.originalUrl,
            slug: url.slug,
            visitCount: url.visits.length,
        };
    }
}