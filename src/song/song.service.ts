import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SongEntity } from './entity/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SongDTO } from './dto/song.dto';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { ArtistEntity } from 'src/artist/entity/artist.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserLikeEntity } from './entity/user-like.entity';
import { FavouritEntity } from './entity/favourite.entity';
import { AlbumEntity } from 'src/album/entity/album.entity';
import { UserCategoryEntity } from 'src/sub-category/entity/user-category';
import { SubCategoryEntity } from 'src/sub-category/entity/sub-category.entity';
import {Notifications} from './notification'
@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private SongRepository: Repository<SongEntity>,
    @InjectRepository(CategoryEntity)
    private CategoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ArtistEntity)
    private ArtistRepository: Repository<ArtistEntity>,
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(UserLikeEntity)
    private UserLikeRepository: Repository<UserLikeEntity>,
    @InjectRepository(FavouritEntity)
    private FavSongRepository: Repository<FavouritEntity>,
    @InjectRepository(AlbumEntity)
    private AlbumRepository: Repository<AlbumEntity>,
    @InjectRepository(UserCategoryEntity)
    private userCatRepository: Repository<UserCategoryEntity>,
    private notification: Notifications
  ) {}

  async addSong(data: SongDTO): Promise<any> {
    try {
      const song = await this.SongRepository.findOne({
        where: { name: data.name },
      });

      if (song) {
        throw new HttpException('Song Exist', HttpStatus.CONFLICT);
      }

      const category = await this.CategoryRepository.findOne({
        where: { id: data.category_id },
      });

      if (!category) {
        throw new HttpException('Category Not Exist', HttpStatus.CONFLICT);
      }

      const artist = await this.ArtistRepository.findOne({
        where: { id: data.artist_id },
      });

      if (!artist) {
        throw new HttpException('Artist Not Exist', HttpStatus.CONFLICT);
      }
      let album;
      if (data.album_id) {
        album = await this.AlbumRepository.findOne({
          where: { id: data.album_id },
        });

        if (!artist) {
          throw new HttpException('Album Not Exist', HttpStatus.CONFLICT);
        }
      }

      const newSong = new SongEntity();
      newSong.name = data.name;
      newSong.category = category;
      newSong.artist = artist;
      newSong.album = data.album_id ? album : null;
      const songData = await this.SongRepository.save(newSong);
      return songData;
    } catch (err) {
      console.log(err);
    }
  }

  async allSongs(perPage, pageIndex): Promise<any> {
    try {
      let limitOption = perPage ? parseInt(perPage) : 1;
      let offsetOption = 0;
      let pagOption = pageIndex ? parseInt(pageIndex) : 1;
      offsetOption = (pagOption - 1) * limitOption;

      const data = await this.SongRepository.createQueryBuilder('p')
        .select([
          'p.id as id',
          'p.name as name',
          'p.is_active as is_active',
          'p.created_at as created_at',
          'c.id as categoryId',
          'c.name as category_name',
          `concat('/media/bytes-nayela/workspace/projects/demo/music/src/utils/',"category_image") as category_image`,
          'a.id as artistId',
          'a.name as artists_name',
          'al.id as albumId',
          'al.name as albumName',
        ])
        .leftJoin(CategoryEntity, 'c', 'p.categoryId = c.id')
        .leftJoin(ArtistEntity, 'a', 'p.artistId  = a.id')
        .leftJoin(AlbumEntity, 'al', 'p.albumId = al.id')
        .where('p.is_active = :is_active', { is_active: true })
        .orderBy('p.id', 'ASC')
        .offset(offsetOption)
        .limit(limitOption);

      const itemCount = await data.getCount();

      // let start = offsetOption + 1;
      // let End = 1 * pagOption;
      // if (pagOption === 1) {
      //   start = 1;
      //   End = limitOption;
      // }
      // if (End > itemCount) {
      //   End = itemCount;
      // }

      return {
        data: await data.getRawMany(),
        totalCount: itemCount,
      };
    } catch (err) {
      console.log(err);
    }

    // return data.getRawMany()
  }

  async userLike(userId, songId): Promise<any> {
    try {
      const user = await this.UserRepository.findOne({
        where: [{ id: userId }],
      });
      if (!user) {
        throw new HttpException('User not Exist', HttpStatus.NOT_FOUND);
      }

      const song = await this.SongRepository.findOne({
        where: { id: songId },
      });

      if (!song) {
        throw new HttpException('Song  Not Exist', HttpStatus.CONFLICT);
      }

      const data = await this.UserLikeRepository.createQueryBuilder('p')
        .where('p.user = :user', { user: userId })
        .andWhere('p.song = :song', { song: songId })
        .getRawOne();

      if (data) {
        throw new HttpException(
          'You already like this song',
          HttpStatus.CONFLICT,
        );
      }

      const userLike = new UserLikeEntity();
      userLike.song = songId;
      userLike.user = userId;
      const result = await this.UserLikeRepository.save(userLike);

      //Send Notification
      const deviceData = {
        token: ''
      }
      let notificationPayload = {
        deviceData: deviceData,
        title: 'Like Song',
        body:  'Like Song',
        itemId: songId,
        sound: 'default',
        badge: 1,
      };
      this.notification.SendPushNotification(notificationPayload)
      
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async userFav(userId, songId): Promise<any> {
    try {
      const user = await this.UserRepository.findOne({
        where: [{ id: userId }],
      });
      if (!user) {
        throw new HttpException('User not Exist', HttpStatus.NOT_FOUND);
      }

      const song = await this.SongRepository.findOne({
        where: { id: songId },
      });

      if (!song) {
        throw new HttpException('Song  Not Exist', HttpStatus.CONFLICT);
      }

      const data = await this.FavSongRepository.createQueryBuilder('p')
        .where('p.user = :user', { user: userId })
        .andWhere('p.song = :song', { song: songId })
        .getRawOne();

      if (data) {
        throw new HttpException(
          'You already like this song',
          HttpStatus.CONFLICT,
        );
      }

      const userLike = new UserLikeEntity();
      userLike.song = songId;
      userLike.user = userId;
      const result = await this.FavSongRepository.save(userLike);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async userSong(userId): Promise<any> {
    try {
      const user = await this.userCatRepository
        .createQueryBuilder('p')
        .where('p.user = :user', { user: userId })
        .select([
          'p.id as id',
          'p.userId as user',
          's.id as subCategoryId',
          's.name as subCategoryName',
          'c.id as categoryId',
          'c.name as category_name',
        ])
        .leftJoin(SubCategoryEntity, 's', 'p.subCategoryId = s.id')
        .leftJoin(CategoryEntity, 'c', 's.categoryId = c.id')
        .getRawOne();

      if (!user) {
        throw new HttpException('User not Exist', HttpStatus.NOT_FOUND);
      }

      const category = await this.SongRepository.createQueryBuilder('p')
        .where('p.category = :category', { category: user.categoryid })
        .leftJoin(CategoryEntity, 'c', 'p.categoryId = c.id')
        .leftJoin(ArtistEntity, 'a', 'p.artistId  = a.id')
        .select([
          'p.id as id',
          'p.name as songName',
          'c.id as categoryId',
          'c.name as category_name',
          'a.id as artistId',
          'a.name as artists_name',
        ])
        .getRawMany();

      if (category.length < 0) {
        throw new HttpException('Songs not Exist', HttpStatus.NOT_FOUND);
      }
      // return category;
      return {
        statusCode: HttpStatus.OK,
        message: `Song Listed`,
        data: category,
      };
    } catch (err) {
      console.log(err);
    }
  }
}
