import {IsString, IsNotEmpty, IsUrl, IsInt, IsOptional} from 'class-validator';

export class CreateUrlDto {
    @IsUrl()
    @IsNotEmpty()
    originalUrl: string;

    @IsOptional()
    @IsInt()
    userId?: number;
}

export class UpdateUrlDto {
    @IsString()
    @IsNotEmpty()
    slug: string;
}