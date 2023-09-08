import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDTO } from './aut.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDTO } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {

  logger: Logger;
  
  constructor(private authService: AuthService,
   ) {
    this.logger = new Logger();
   }

  @ApiTags('Auth')
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUSer(@Body() body:UserLoginDTO): Promise<any> {
    this.logger.log('---------Login--------!');
    return this.authService.loginUser(body);
  }
}
