import {IsString, IsNotEmpty, IsUrl, IsInt, IsOptional} from 'class-validator';

export class CreateUrlDto {
    @IsUrl()
    @IsNotEmpty()
    originalUrl!: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsInt()
    userId?: number;
}