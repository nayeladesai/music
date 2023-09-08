import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryEntity } from './entity/sub-category.entity';
import { SubCategoryDTO } from './dto/subCategory.dto';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { UserCategoryEntity } from './entity/user-category';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private SubCategoryRepository: Repository<SubCategoryEntity>,
    @InjectRepository(CategoryEntity)
    private CategoryRepository: Repository<CategoryEntity>,
    @InjectRepository(UserCategoryEntity)
    private UserCategoryRepository: Repository<UserCategoryEntity>,
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async addSubCategory(file, data: SubCategoryDTO, id): Promise<any> {
    try {
      //find Ctegory
      const category = await this.CategoryRepository.findOne({ where: { id } });

      if (!category) {
        throw new HttpException('Category Not Exist', HttpStatus.CONFLICT);
      }
      const isExist = await this.SubCategoryRepository.findOne({
        where: { name: data.name },
      });

      if (isExist) {
        throw new HttpException('Name Already Exist', HttpStatus.CONFLICT);
      }

      const newSubCategoryEntity = new SubCategoryEntity();
      (newSubCategoryEntity.name = data.name),
        (newSubCategoryEntity.sub_category_image = file.filename);
      newSubCategoryEntity.category = id;
      const subCategory = await this.SubCategoryRepository.save(
        newSubCategoryEntity,
      );

      return subCategory;
    } catch (err) {
      console.log(err);
    }
  }

  async addUserCategory(userId, subCatrgoryId): Promise<any> {
    try {
      const category = await this.SubCategoryRepository.findOne({
        where: { id: subCatrgoryId },
      });

      if (!category) {
        throw new HttpException('Category Not Exist', HttpStatus.CONFLICT);
      }

      const user = await this.UserRepository.findOne({
        where: [{ id: userId }],
      });
      if (!user) {
        throw new HttpException('User not Exist', HttpStatus.NOT_FOUND);
      }

      const newUSerCategoryEntity = new UserCategoryEntity();
      (newUSerCategoryEntity.user = userId),
        (newUSerCategoryEntity.sub_category = subCatrgoryId);
      const userCategory = await this.UserCategoryRepository.save(
        newUSerCategoryEntity,
      );
      return userCategory;
    } catch (err) {
      console.log(err);
    }
  }

  async getSubCategory(): Promise<any> {
    try {
      
      const data = await this.SubCategoryRepository.createQueryBuilder('p')
        .where('p.is_active = :is_active', { is_active: true })
        .orderBy('p.id', 'ASC')
        .leftJoinAndSelect('p.category', 'categorys', 'categorys.id = p.id')
        .select([
          'p.id as id',
          'p.name as name',
          'p.created_at as created_at',
          'p.is_active as is_active',
          'p.categoryId as category_id',
          'categorys.id as categoSubCategoryEntityrys_id',
          'categorys.name  as categorys_name',
          `concat('/media/bytes-nayela/workspace/projects/demo/music/src/utils/',"sub_category_image") as sub_category_image`,
        ])
        .getRawMany();

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
