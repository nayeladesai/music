import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentEntity } from './entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from 'src/song/entity/song.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CommentEntity,SongEntity,UserEntity])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
