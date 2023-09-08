import { IsString, IsEmail,  MinLength, MaxLength, Matches, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Exclude } from "class-transformer";
import { Gender } from "../entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";

export class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsString()
    last_name: string;

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

    @ApiProperty()
    dob: Date

    @ApiProperty()
    @IsEnum(Gender)
    gender?: Gender;
    
    created_at: Date

    updated_at: Date

    @ApiProperty()
    is_active: boolean
}

export class UserResponsesDTO extends UserDTO {
    @IsOptional()
    @Exclude({ toPlainOnly: true })
    @Column({ select: false })
    password: string;

    @IsOptional()
    // @Exclude({ toPlainOnly: true })
    // @Column({ select: false })
    is_active: boolean
}


export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
  }



  export class UserLoginDTO{
    // @IsOptional()
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}