import { ArtistEntity } from 'src/artist/entity/artist.entity';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { SongEntity } from 'src/song/entity/song.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { PrimaryGeneratedColumn, Column,  CreateDateColumn, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity('album')
export  class AlbumEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @ManyToOne((type) => ArtistEntity, {
        nullable: false,
        lazy: true,
        onDelete: 'CASCADE',
      })
      @JoinColumn()
      artist!: ArtistEntity[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @Column({ default: true })
    is_active: boolean;
   
}