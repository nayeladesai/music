import { IsString,  IsNotEmpty, IsNumber, IsOptional,  } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CommentDTO {
    @ApiProperty()
    @IsString()
    comment: string;

    @ApiProperty()
    @IsNotEmpty()
    userId!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    songId: number;

    created_at: Date

    updated_at: Date
}
