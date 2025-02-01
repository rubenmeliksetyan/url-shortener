import { IsString, IsNotEmpty, IsUrl, IsInt } from 'class-validator';

export class CreateUrlDto {
    @IsUrl()
    @IsNotEmpty()
    originalUrl: string;

    @IsInt()
    userId: number;
}

export class UpdateUrlDto {
    @IsString()
    @IsNotEmpty()
    slug: string;
}