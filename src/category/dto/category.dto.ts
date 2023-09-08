import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { ApiBody, ApiConsumes, ApiProperty } from "@nestjs/swagger";
import { UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";



export class CategoryDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;    
        
    created_at: Date

    updated_at: Date

    @ApiProperty()
    is_active: boolean

}

export class CategoryResponse{
    @IsString()
    name: string;
}





