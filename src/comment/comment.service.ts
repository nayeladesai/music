import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entity/comment.entity';
import { SongEntity } from 'src/song/entity/song.entity';
import { CommentDTO } from './dto/comment.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { SuccessModel } from 'src/utils/sucess.response';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private CommentRepository: Repository<CommentEntity>,
    @InjectRepository(SongEntity)
    private SongRepository: Repository<SongEntity>,
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async addComment(data: CommentDTO): Promise<any> {
    try {
      const song = await this.SongRepository.findOne({
        where: { id: data.songId },
      });

      if (!song) {
        throw new HttpException('Song Not Exist', HttpStatus.CONFLICT);
      }

      const user = await this.UserRepository.findOne({
        where: [{ id: data.userId }],
      });
      if (!user) {
        throw new HttpException('User not Exist', HttpStatus.NOT_FOUND);
      }

      const newomment = new CommentEntity();
      newomment.comment = data.comment;
      newomment.songs = song;
      newomment.users = user;
      const dta = await this.CommentRepository.save(newomment);
      // return new SuccessModel();
      return dta;
    } catch (err) {
      console.log(err);
    }
  }

  async getComment(songId): Promise<any> {
    try {
      const data = await this.CommentRepository.createQueryBuilder('p')
        .where('p.songs = :songs', { songs: songId })
        .leftJoinAndSelect('p.songs', 'song', 'song.id = p.songs')
        .leftJoinAndSelect('p.users', 'user', 'user.id = p.users')
        .select([
          'p.id as id',
          'p.comment as comment',
          'p.created_at as created_at',
          'song.id as songId',
          'song.name as song_name',
          'user.id as userId',
          'user.first_name as user_first_name',
          'user.last_name as user_last_name',
        ])
        .getRawMany();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
