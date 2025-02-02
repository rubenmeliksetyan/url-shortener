import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import {Url} from "../url/url.entity";

@Entity()
export class Visit {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Url, (url) => url.visits, { onDelete: 'CASCADE' })
    url: Url;

    @CreateDateColumn()
    visitedAt: Date;
}