import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity';
import {Url} from "../url/url.entity";

@Injectable()
export class VisitService {
    constructor(
        @InjectRepository(Visit)
        private readonly visitRepository: Repository<Visit>,
    ) {}

    async trackVisit(url: Url): Promise<void> {
        const visit = this.visitRepository.create({ url });
        await this.visitRepository.save(visit);
    }
}