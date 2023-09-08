import { IsString, IsEmail,  MinLength, MaxLength, Matches, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class AuthDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString({ always: true })
    @IsEmail()
    email: string;

    @ApiProperty()
    // @IsOptional()
    @IsString()
    // @MinLength(4)
    // @MaxLength(5)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
}
