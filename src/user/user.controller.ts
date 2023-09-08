import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileUploadDto, UserDTO, UserLoginDTO, UserResponsesDTO } from './dto/user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDTO } from './dto/user.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { SuccessModel } from 'src/utils/sucess.response';
import { PageOptionsDto } from 'src/utils/pageOption.dto';
import { PageDto } from 'src/utils/page.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role, UserEntity } from './entity/user.entity';
import { User } from 'src/utils/user.decorator';
import { HasRoles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/auth/roles.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //Add User
  // @UseGuards(AuthGuard('jwt'))
  
  @Post('/register')
  async addUser(@Body() body: UserDTO): Promise<UserResponseDTO> {
    return await this.userService.addUser(body);
  }

  //get All User
  @ApiBearerAuth()
  @HasRoles(Role.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getUser(
    @User() user: UserEntity,
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<UserResponsesDTO>> {
    console.log("----sadad--",user);
    
    const users = await this.userService.getUser(pageOptionsDto);
    return users;
  }

  //update User
  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: UserResponsesDTO,
  ): Promise<UserResponseDTO> {
    return await this.userService.updateUser(id, body);
  }

  //remove User
  @Delete()
  async deleteUser(
    @Query('id') id: number,) {
      return await this.userService.deleteUser(id);
  }

  //upload image
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
    destination: '/media/bytes-nayela/workspace/projects/demo/music/src/utils',
    filename: (req, file, cb) => {
       const randomName = Array(32).fill(null).map(() => 
      (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, new Date().getTime().toString() +`${extname(file.originalname)}`);
        },
      }),
     }
  ))

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  async uploadAvatar(
    @UploadedFile()
    file,
    @Param('id') id: number,
  ) : Promise<SuccessModel>{  
    return this.userService.uploadAvatar(file, id);
  }

  // @Post('login')
  // async loginUSer(body: UserLoginDTO): Promise<any>{
  //   return this.userService.loginUser(body)
  // }
}
function GetUser(): (target: UserController, propertyKey: "getUser", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

