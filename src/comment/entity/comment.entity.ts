import { ArtistEntity } from 'src/artist/entity/artist.entity';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { SongEntity } from 'src/song/entity/song.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { PrimaryGeneratedColumn, Column,  CreateDateColumn, Entity, OneToOne, JoinColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';

@Entity('comment')
export  class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    comment: string;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    users: UserEntity

    @ManyToOne(() => SongEntity, (song) => song.comments)
    songs: SongEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @Column({ default: true })
    is_active: boolean;
   
}