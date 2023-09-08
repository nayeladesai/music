import { Body, Controller, Get ,Post, Query} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDTO } from './dto/artist.dto';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Post()
    async addArtist(
        @Body() data: ArtistDTO,
    ): Promise<any>{
        return await this.artistService.addArtist(data)
    }

    @Get()
    async getArtist(): Promise<any>{
        return await this.artistService.getArtist()
    }

    @Get('song')
    async getArtistSong(
        @Query('artistId') artistId: number, 
    ): Promise<any>{
        return await this.artistService.getArtistSong(artistId)
    }
}
