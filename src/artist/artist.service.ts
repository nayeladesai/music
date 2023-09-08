import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { Repository } from 'typeorm';
import { ArtistDTO } from './dto/artist.dto';
import { SongEntity } from 'src/song/entity/song.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private ArtistRepository: Repository<ArtistEntity>,
    @InjectRepository(SongEntity)
    private SongRepository: Repository<SongEntity>,
  ) {}
  async addArtist(data: ArtistDTO): Promise<any> {
    const artist = await this.ArtistRepository.findOne({
      where: { name: data.name },
    });

    if (artist) {
      throw new HttpException('Artist Exist', HttpStatus.CONFLICT);
    }

    const newArtist = new ArtistEntity();
    newArtist.name = data.name;
    const artists = await this.ArtistRepository.save(newArtist);

    return artists;
  }

  async getArtist(): Promise<any> {
    const artist = await this.ArtistRepository.find({
      where: {
        is_active: true,
      },
    });
    return artist;
  }


  async getArtistSong(artistId): Promise<any>{

    const artist = await this.ArtistRepository.findOne({
      where: { id:artistId },
    });

    if (!artist) {
      throw new HttpException('Artist Not Exist', HttpStatus.CONFLICT);
    }

    const song = await this.SongRepository.createQueryBuilder('p')
    .where('p.artist = :artist', {artist: artistId})
    .leftJoinAndMapMany('p.artists',ArtistEntity, 'a', 'p.artistId  = a.id')
    .select([
      'a.name as artistName',
      'p.id as songId',
      'p.name as songName',
      'a.created_at as created_at'
    ])
    .getRawMany()
    console.log(typeof song);
    

    const songs = await this.ArtistRepository.createQueryBuilder('a')
    .select([
      'a.*',
      'array_agg("s"."name")'])
    .innerJoin(SongEntity ,'s','s.artistId =  a.id')
    .where('a.id = :artist', {artist: artistId})
    .groupBy('a.id')
    .getRawMany()

//Grouping Data    
    const groupByKey = (list, key, {omitKey=false}) => list.reduce((hash, {[key]:value, ...rest}) => ({...hash, [value]:( hash[value] || [] ).concat(omitKey ? {...rest} : {[key]:value, ...rest})} ), {})
    const result = groupByKey(song, 'artistname', {omitKey:true})
    return result
  }
}
