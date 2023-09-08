import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumDTO } from './dto/album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entity/album.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private albumRepository: Repository<AlbumEntity>,
    ){}

    async addAlbum(body: AlbumDTO,artistId): Promise<any>
    {
        const data = await this.albumRepository.createQueryBuilder('p')
        .where('p.artist = :artist', { artist: artistId })
        .andWhere('p.name = :name', {name: body.name})
        .getRawOne();

        if(data){
            throw new HttpException('Album already created', HttpStatus.CONFLICT);
        }

        const newAlbum = new AlbumEntity()
        newAlbum.name = body.name,
        newAlbum.artist = artistId
        const result = await this.albumRepository.save(newAlbum)
        return result
    }

    async getAlbum(): Promise<any>{

        const result = await this.albumRepository.find({
            where:{
                is_active: true
            },
            relations: ['artist'],
        })
        // const data = await this.albumRepository.createQueryBuilder('p')
        // .where('p.is_active = :is_active', { is_active: true })
        // .leftJoinAndSelect('p.artist','artists','artists.id = p.id')
        // .getRawMany()
        return result
    }
}
