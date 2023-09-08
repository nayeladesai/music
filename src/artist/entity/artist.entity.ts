import { SongEntity } from 'src/song/entity/song.entity';
import { PrimaryGeneratedColumn, Column,  CreateDateColumn, Entity, OneToMany } from 'typeorm';

@Entity('artist')
export  class ArtistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @Column({ default: true })
    is_active: boolean;
   
    // @OneToMany(() => SongEntity, (song) => song.artist)
    // songs: SongEntity[]
}