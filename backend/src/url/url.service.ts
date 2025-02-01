import {Injectable, NotFoundException, ConflictException, Req} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as crypto from 'crypto';
import {Url} from "./url.entity";
import {User} from "../user/user.entity";
import {CreateUrlDto, UpdateUrlDto} from "../common/dto/url.dto";
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

    async createUrl(createUrlDto: CreateUrlDto): Promise<Url> {
        const {originalUrl} = createUrlDto;

        const user = await this.userRepository.findOne({where: {id: createUrlDto.userId}});
        if (!user) {
            throw new NotFoundException('User not found');
        }

        let slug = crypto.createHash('md5').update(originalUrl).digest('hex').substring(0, 6);

        while (await this.urlRepository.findOne({where: {slug: slug}})) {
            slug = crypto.createHash('md5').update(originalUrl).digest('hex').substring(0, 6);
        }


        const newUrl = this.urlRepository.create({originalUrl, slug: slug, user});

        return this.urlRepository.save(newUrl);
    }

    async updateUrl(id: number, updateUrlDto: UpdateUrlDto): Promise<Url> {
        const {slug} = updateUrlDto;

        const url = await this.urlRepository.findOne({where: {id}, relations: ['user']});
        if (!url) {
            throw new NotFoundException('URL not found');
        }

        url.slug = slug;

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