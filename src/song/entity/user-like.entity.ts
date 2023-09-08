import { UserEntity } from 'src/user/entity/user.entity';
import { PrimaryGeneratedColumn, Column,  CreateDateColumn, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { SongEntity } from './song.entity';

@Entity('user_like')
export  class UserLikeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => UserEntity, {
        nullable: false,
        lazy: true,
        onDelete: 'CASCADE',
      })
      @JoinColumn()
      user!: UserEntity[];


      @ManyToOne((type) => SongEntity, {
        nullable: false,
        lazy: true,
        onDelete: 'CASCADE',
      })
      @JoinColumn()
      song!: SongEntity[];


    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @Column({ default: true })
    status: boolean;
   
}