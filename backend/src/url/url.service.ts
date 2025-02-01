import {Injectable, NotFoundException, ConflictException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as crypto from 'crypto';
import {Url} from "./url.entity";
import {User} from "../user/user.entity";
import {CreateUrlDto, UpdateUrlDto} from "../common/dto/url.dto";

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private readonly urlRepository: Repository<Url>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async createUrl(createUrlDto: CreateUrlDto): Promise<Url> {
        const {originalUrl, userId} = createUrlDto;

        const user = await this.userRepository.findOne({where: {id: userId}});
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
        return this.urlRepository.findOne({where: {slug: slug}});
    }
}