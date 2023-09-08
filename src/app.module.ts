import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { UserProfileEntity } from './user/entity/user-profile.entity';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ArtistModule } from './artist/artist.module';
import { SongModule } from './song/song.module';
import { CommentModule } from './comment/comment.module';
import { AlbumModule } from './album/album.module';
import { CategoryEntity } from './category/entity/category.entity';
import { SubCategoryEntity } from './sub-category/entity/sub-category.entity';
import { UserCategoryEntity } from './sub-category/entity/user-category';
import { ArtistEntity } from './artist/entity/artist.entity';
import { AlbumEntity } from './album/entity/album.entity';
import { SongEntity } from './song/entity/song.entity';
import { UserLikeEntity } from './song/entity/user-like.entity';
import { FavouritEntity } from './song/entity/favourite.entity';
import { CommentEntity } from './comment/entity/comment.entity';
import { AuthModule } from './auth/auth.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
require('dotenv').config();
import * as Joi from '@hapi/joi'
@Module({
  imports: [
    CoursesModule,
    // TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.POSTGRES_HOST}`,
      port: parseInt(`${process.env.POSTGRES_PORT}`),
      username: `${process.env.POSTGRES_USER}`,
      password: `${process.env.POSTGRES_PASSWORD}`,
      database: `${process.env.POSTGRES_DATABASE}`,
      entities: [
        UserEntity,
        UserProfileEntity,
        CategoryEntity,
        SubCategoryEntity,
        UserCategoryEntity,
        ArtistEntity,
        AlbumEntity,
        SongEntity,
        UserLikeEntity,
        FavouritEntity,
        CommentEntity,
      ],
      logging: ['query', 'log', 'error'],
      // autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    SubCategoryModule,
    ArtistModule,
    SongModule,
    CommentModule,
    AlbumModule,
    AuthModule,
    StripeModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
      })
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
