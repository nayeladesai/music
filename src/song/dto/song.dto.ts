import { IsString,  IsNotEmpty, IsNumber, IsOptional,  } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SongDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    category_id!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    artist_id: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    album_id: number;

    created_at: Date

    updated_at: Date
}
