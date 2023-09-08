import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDTO, CategoryResponse } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private CategoryRepository: Repository<CategoryEntity>,
  ) {}

  async addCategory(file, data: CategoryDTO): Promise<any> {
    try {
      const isExist = await this.CategoryRepository.findOne({
        where: { name: data.name },
      });

      if (isExist) {
        throw new HttpException('Name Already Exist', HttpStatus.CONFLICT);
      }

      const newCategoryEntity = new CategoryEntity();
      (newCategoryEntity.name = data.name),
        (newCategoryEntity.category_image = file.filename);
      newCategoryEntity.is_active = true;
      const category = await this.CategoryRepository.save(newCategoryEntity);

      return category;
    } catch (err) {
      console.log(err);
    }
  }

  async getCategory(): Promise<any> {
    try {
      const data = await this.CategoryRepository.createQueryBuilder('p')
        .where('p.is_active = :is_active', { is_active: true })

        .orderBy('p.id', 'ASC')
        .select([
          'p.id as id',
          'p.name as name',
          'p.created_at as created_at',
          'p.is_active as is_active',
        ])
        .addSelect(
          `concat('/media/bytes-nayela/workspace/projects/demo/music/src/utils/',"category_image") as category_image`,
        )
        .getRawMany();

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
