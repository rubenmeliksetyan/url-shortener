import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, ManyToOne} from 'typeorm';
import {User} from "../user/user.entity";

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Index({ unique: true })
    slug: string;

    @Column()
    originalUrl: string;

    @ManyToOne(() => User, (user) => user.urls, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}