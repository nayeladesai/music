import { IsString,  IsNotEmpty, IsNumber, IsOptional,  } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class AlbumDTO {
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    created_at: Date

    updated_at: Date
}
