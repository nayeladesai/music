import { IsString, IsEmail,  MinLength, MaxLength, Matches, IsEnum, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class StripeDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty()
    @IsString({ always: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class ChargeDTO {
    @ApiProperty()
    @IsNumber()
    amount: number
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    paymentMethodId: string
    
    @ApiProperty()
    @IsString()
    userId: string
}



