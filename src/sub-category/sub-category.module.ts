import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryEntity } from './entity/sub-category.entity';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { UserCategoryEntity } from './entity/user-category';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SubCategoryEntity,CategoryEntity,UserCategoryEntity,UserEntity])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService]
})
export class SubCategoryModule {}
