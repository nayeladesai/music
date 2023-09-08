import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/entity/user.entity';


export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);