import {
  Body,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Post, Get } from '@nestjs/common';
import { CategoryDTO, CategoryResponse } from './dto/category.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Cetegory')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  //Add User
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination:
          '/media/bytes-nayela/workspace/projects/demo/music/src/utils',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(
            null,
            new Date().getTime().toString() + `${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )

  
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CategoryDTO,
  })
  async addCategory(
    @UploadedFile()
    file,
    @Body() data: CategoryDTO,
  ): Promise<any> {
    return await this.categoryService.addCategory(file, data);
  }

  @Get()
  async getCategory(): Promise<any> {
    const category = await this.categoryService.getCategory();
    return category;
  }
}
