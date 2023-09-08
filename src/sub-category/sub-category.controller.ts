import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Get
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryDTO } from './dto/subCategory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Sub-Category')
@Controller('sub-category')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Post('/:id')
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
    type: SubCategoryDTO,
  })
  async addSubCategory(
    @UploadedFile()
    file,
    @Body() data: SubCategoryDTO,
    @Param('id') id: number,
  ): Promise<any> {
    return await this.subCategoryService.addSubCategory(file, data, id);
  }

  //User Category
  @Post(':id/User')
  async addUserCategory(
    @Param('id') userId: number,
    @Query('subCatrgoryId') subCatrgoryId: number,
  ) : Promise<any>
  {
   return await this.subCategoryService.addUserCategory(userId,subCatrgoryId) ;
  }
  
  @Get()
  async getSubCategory(): Promise<any>{
    const subCategory = await this.subCategoryService.getSubCategory();
    return subCategory;
  }
}
