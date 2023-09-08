import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { SongEntity } from 'src/song/entity/song.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ArtistEntity,SongEntity])],
  controllers: [ArtistController],
  providers: [ArtistService]
})
export class ArtistModule {}
