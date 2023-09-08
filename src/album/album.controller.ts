import { Body, Controller,Post, Query,Get } from '@nestjs/common';
import { AlbumService } from './album.service';
import { ApiTags } from '@nestjs/swagger';
import { AlbumDTO } from './dto/album.dto';


@ApiTags('Album')
@Controller('album')
export class AlbumController {
    constructor(
       private albumService: AlbumService
    ){}

    @Post('')
  async addAlbum(@Body() body: AlbumDTO,
  @Query('artistId') artistId: number,): Promise<any> {
    return await this.albumService.addAlbum(body,artistId);
  }

  @Get()
  async getAlbum(): Promise<any>{
    return await this.albumService.getAlbum()
  }
}
