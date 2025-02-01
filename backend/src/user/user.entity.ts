import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Url} from "../url/url.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @OneToMany(() => Url, (url) => url.user)
    urls: Url[];
}