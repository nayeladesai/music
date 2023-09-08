import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SubCategoryDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
    
    created_at: Date

    updated_at: Date

    // @ApiProperty()
    // is_active: boolean
}


