import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDTO, UserLoginDTO, UserResponsesDTO } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import bcrypt = require('bcryptjs');
import { plainToClass } from 'class-transformer';
import { UserResponseDTO } from './dto/user.response';
import { catchError, firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';
import { UserProfileEntity } from './entity/user-profile.entity';
import { AxiosError } from 'axios';
import { query } from 'express';
import { SuccessModel } from 'src/utils/sucess.response';
import { PageOptionsDto } from 'src/utils/pageOption.dto';
require('dotenv').config();
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private UserProfileRepository: Repository<UserProfileEntity>,
  ) {}

  async addUser(data: UserDTO): Promise<UserResponseDTO> {
    try {
      const { email, password } = data;
      const isExist = await this.UserRepository.findOne({ where: [{ email }] });

      if (isExist) {
        throw new HttpException('email Already Exist', HttpStatus.CONFLICT);
      }
      // const newUser: UserEntity = new UserEntity();

      //Stripe USer
      // const stripeCustomer = await this.StripeService.createCustomer(data.first_name, data.email);

      const newUserEntity = new UserEntity();
      newUserEntity.first_name = data.first_name;
      newUserEntity.last_name = data.last_name;
      newUserEntity.dob = data.dob;
      newUserEntity.gender = data.gender;
      newUserEntity.email = data.email;
      newUserEntity.password = await bcrypt.hash(password, 5);
      // newUserEntity.stripeCustomerId = stripeCustomer.id // Stripe Id Add
      const user = await this.UserRepository.save(newUserEntity);

      const newUser = new UserProfileEntity();
      newUser.user = user;
      // newUser.profile_pic = 'Demo';
      await this.UserProfileRepository.save(newUser);

      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        is_active: user.is_active,
        created_at: user.created_at,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getUser(pageOptionsDto: PageOptionsDto): Promise<any> {
    try {
      const data = await this.UserRepository.createQueryBuilder('p')
        .where('p.is_active = :is_active', { is_active: true })
        .innerJoinAndSelect('p.user_profile', 'user', 'user.id = p.id')
        .select([
          'p.id as id',
          'p.first_name as first_name',
          'p.last_name as last_name',
          'p.email as email',
          'p.dob as dob',
          'p.gender as gender',
          'p.created_at as created_at',
          'p.is_active as is_active',
        ])
        .addSelect(
          `concat('/media/bytes-nayela/workspace/projects/demo/music/src/utils/',"user"."profile_pic") as profile`,
        )
        .orderBy('p.id', pageOptionsDto.order);

      // const itemCount = await data.getCount();
      // const  entities  = await data.getRawMany();
      // const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      // return new PageDto(entities, pageMetaDto);
      const entities = await data.getRawMany();
      const itemCount = await data.getCount();
      return {
        count: itemCount,
        data: entities,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(id, body): Promise<UserResponseDTO> {
    try {
      const isExist = await this.UserRepository.findOne({ where: [{ id }] });
      if (!isExist) {
        throw new HttpException('User not Exist', HttpStatus.NOT_FOUND);
      }

      isExist.first_name = body.first_name;
      isExist.first_name = body.first_name;
      isExist.last_name = body.last_name;
      isExist.dob = body.dob;
      isExist.gender = body.gender;
      isExist.email = body.email;
      // isExist.password = await bcrypt.hash(body.password, 5);
      // Object.assign(isExist, body);
      const data = await this.UserRepository.save(isExist);
      return {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        dob: data.dob,
        gender: data.gender,
        is_active: data.is_active,
        created_at: data.created_at,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser(id): Promise<any> {
    try {
      const isExist = await this.UserRepository.findOne({ where: [{ id }] });
      if (!isExist) {
        throw new HttpException('User not Exist', HttpStatus.NOT_FOUND);
      }
      await this.UserRepository.delete(id);

      return `remove User`;
    } catch (err) {
      console.log(err);
    }
  }

  async uploadAvatar(file, id): Promise<SuccessModel> {
    try {
      const isExist = await this.UserProfileRepository.findOne({
        where: {
          user: {
            id: id,
          },
        },
        loadRelationIds: true,
      });

      if (!isExist) {
        throw new HttpException('User not Exist', HttpStatus.NOT_FOUND);
      }

      isExist.profile_pic = file.filename;
      const data = await this.UserProfileRepository.save(isExist);
      return new SuccessModel();
    } catch (err) {
      console.log(err);
    }
  }
}
