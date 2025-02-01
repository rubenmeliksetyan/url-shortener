import {IsString, IsEmail, IsNotEmpty, MinLength, MaxLength} from 'class-validator';
import {Unique} from "typeorm";

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    @Unique('email', ['email'])
    email: string;

    @IsString()
    @MinLength(6, {message: 'Password is too short. Minimum length is 6 characters.'})
    @MaxLength(20, {message: 'Password is too long. Maximum length is 20 characters.'})
    @IsNotEmpty()
    password: string;

    @IsString()
    @MaxLength(40, {message: 'name is too long. Maximum length is 40 characters.'})
    @IsNotEmpty()
    name: string;
}