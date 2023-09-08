import { AlbumEntity } from 'src/album/entity/album.entity';
import { ArtistEntity } from 'src/artist/entity/artist.entity';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { CommentEntity } from 'src/comment/entity/comment.entity';
import { PrimaryGeneratedColumn, Column,  CreateDateColumn, Entity, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('song')
export  class SongEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToOne((type) => CategoryEntity, {
        nullable: false,
        lazy: true,
        onDelete: 'CASCADE',
      })
      @JoinColumn()
      category!: CategoryEntity;


      @ManyToOne((type) => ArtistEntity, {
        nullable: false,
        lazy: true,
        onDelete: 'CASCADE',
      })
      @JoinColumn()
      artist!: ArtistEntity;

      // @ManyToOne(() => ArtistEntity, (artist) => artist.songs)
      // artist: ArtistEntity

      @ManyToOne((type) => AlbumEntity, {
        nullable: true,
        lazy: true,
        onDelete: 'CASCADE',
      })
      @JoinColumn()
      album!: AlbumEntity;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ default: true })
    is_active: boolean;

    @OneToMany(() => CommentEntity, (comment) => comment.songs)
    comments: CommentEntity[]
   
}