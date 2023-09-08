import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './entity/song.entity';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { ArtistEntity } from 'src/artist/entity/artist.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserLikeEntity } from './entity/user-like.entity';
import { FavouritEntity } from './entity/favourite.entity';
import { AlbumEntity } from 'src/album/entity/album.entity';
import { UserCategoryEntity } from 'src/sub-category/entity/user-category';
import { Notifications } from './notification';

@Module({
  imports:[TypeOrmModule.forFeature([SongEntity,CategoryEntity,ArtistEntity,UserEntity,UserLikeEntity,FavouritEntity,AlbumEntity,UserCategoryEntity])],
  controllers: [SongController],
  providers: [SongService,Notifications]
})
export class SongModule {}
