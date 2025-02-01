import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, ManyToOne, OneToMany} from 'typeorm';
import {User} from "../user/user.entity";
import {Visit} from "../visit/visit.entity";

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    // there can be hash index for more efficient search, but type script don't support it yet.
    // https://github.com/typeorm/typeorm/issues/10964
    @Column({ unique: true })
    @Index({ unique: true })
    slug: string;

    @Column()
    originalUrl: string;

    @ManyToOne(() => User, (user) => user.urls, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Visit, (visit) => visit.url)
    visits: Visit[];

    @CreateDateColumn()
    createdAt: Date;
}