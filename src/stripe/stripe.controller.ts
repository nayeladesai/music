import { Body, Controller, Post,Get, Put, UseGuards } from '@nestjs/common';
import { ChargeDTO, StripeDTO } from './dto/stripe.dto';
import { StripeService } from './stripe.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HasRoles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/auth/roles.guard';
import { Role, UserEntity } from 'src/user/entity/user.entity';
import { User } from 'src/utils/user.decorator';

@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService,) {}

  @ApiBearerAuth()
  @HasRoles(Role.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  async createCustomer(@Body() body: StripeDTO, @User() user: UserEntity,): Promise<any> {
    return await this.stripeService.createCustomer(body.name, body.email,user);
  }

  @Put()
  async charge(
    @Body() body:ChargeDTO
  ):Promise<any>{
    return await this.stripeService.charge(body)
  }

  @ApiBearerAuth()
  @HasRoles(Role.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async allCard(@User() user: UserEntity):Promise<any>{
    return await this.stripeService.allCard(user)
  }
}
