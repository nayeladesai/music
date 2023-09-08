import { Body, Controller, Get ,Post,Put, Query} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { SongDTO } from './dto/song.dto';
import { SongService } from './song.service';

@ApiTags('Song')
@Controller('song')
export class SongController {
    constructor(
        private songService: SongService
    ){}
    
    @Post()
    async addSong(
        @Body() data: SongDTO,
    ): Promise<any>{
        return await this.songService.addSong(data)
    }

    @Get()
    async allSongs(
        @Query('perPage') perPage: number,
        @Query('pageIndex') pageIndex: number,
    ):Promise<any>{
        return await this.songService.allSongs(perPage,pageIndex)
    }

    @Put('like')
    async userLike(
        @Query('userId') userId: number,
        @Query('songId') songId: number,
    ) :Promise<any>{
        return await this.songService.userLike(userId,songId)
    }

    @Put('favourit')
    async userFav(
        @Query('userId') userId: number,
        @Query('songId') songId: number,
    ):Promise<any>{
        return await this.songService.userFav(userId,songId)
    }

    @Get('song')
    async userSong(
        @Query('userId') userId: number,
    ): Promise<any>{
        return await this.songService.userSong(userId)
    }
    
}
