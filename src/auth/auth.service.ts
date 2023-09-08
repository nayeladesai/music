import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDTO } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  logger: Logger;
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    private jwtTokenService: JwtService,
  ) {
    this.logger = new Logger();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.UserRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: any) {
    this.logger.log('---------Login--------!');

    try {
      const payload = { name: data.name, password: data.password };

      return {
        access_token: this.jwtTokenService.sign(payload),
      };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async loginUser(body: UserLoginDTO): Promise<any> {
    try {
      const { email, password } = body;
      const isExist = await this.UserRepository.findOne({
        where: {
          email: email,
        },
      });

      //Na@123 -- password
      if (!isExist) {
        throw new HttpException('User not Exist', HttpStatus.NOT_FOUND);
      }
      const passwordCheck = await bcrypt.compare(password, isExist.password);

      if (!passwordCheck) {
        throw new HttpException(
          'email or password is wrong !!!',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = {
        email: body.email,
        password: body.password,
        roles: isExist.roles,
        id: isExist.id,
      };

      return {
        access_token: this.jwtTokenService.sign(payload),
      };
    } catch (err) {
      console.log(err);
    }
  }
}
