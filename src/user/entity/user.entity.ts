import { PrimaryGeneratedColumn, Column,  CreateDateColumn, Entity, OneToOne, OneToMany } from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { CommentEntity } from 'src/comment/entity/comment.entity';
import { UserCategoryEntity } from 'src/sub-category/entity/user-category';

export enum Gender {
    Female = "female",
    Male = "male"
}

export enum Role {
    User = 'user',
    Artist = 'artist'
}

@Entity('user')
export  class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    first_name: string;

    @Column({ type: 'varchar', length: 50 })
    last_name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'date'})
    dob: Date;

    @Column('enum', { enum: Gender })
    gender: Gender;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @Column({ default: true })
    is_active: boolean;

    @OneToOne((type) => UserProfileEntity, (c) => c.user, { lazy: true })
    user_profile!: Promise<UserProfileEntity | undefined>;

    @OneToMany(() => CommentEntity, (comment) => comment.users)
    comments: CommentEntity[]

    @OneToOne((type) => UserCategoryEntity, (c) => c.user, { lazy: true })
    user_category!: Promise<UserCategoryEntity | undefined>;

    @Column('enum', { enum: Role ,default : 'user'})
    roles: Role;

    @Column({ default: null })
   stripeCustomerId: string;

// @Column({ type: 'json', array: true, default: [] })
//    stripeCustomerId: string[];
   
   
}