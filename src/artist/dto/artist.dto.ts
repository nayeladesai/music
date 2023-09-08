import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class ArtistDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  created_at: Date;

  updated_at: Date;

  // @ApiProperty()
  // is_active: boolean
}
