import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserProfileEntity } from './entity/user-profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature ([UserEntity,UserProfileEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
