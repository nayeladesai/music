import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { ChargeDTO, StripeDTO } from './dto/stripe.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createCustomer(name, email, user) {
    try {
      const stripeCustomerId = await this.stripe.customers.create({
        name,
        email,
      });
      console.log('-----', stripeCustomerId);

      //Add in DataBase
      const users = await this.UserRepository.findOne({
        where: {
          id: user.id,
        },
      });
      users.stripeCustomerId = (await stripeCustomerId).id;
      const data = await this.UserRepository.save(users);
      return stripeCustomerId;
    } catch (err) {
      console.log(err);
    }
  }

  async charge(body: ChargeDTO): Promise<any> {
    try {
      const { amount, userId, paymentMethodId } = body;
      const token = await this.stripe.tokens.create({
        card: {
          number: '5555555555554444',
          exp_month: '8',
          exp_year: '2024',
          cvc: '123',
        },
      });

      const ca = await this.stripe.customers.createSource(userId, {
        source: token.id,
      });

      const charge = await this.stripe.paymentIntents.create({
        amount,
        customer: userId,
        payment_method: token.card.id,
        currency: this.configService.get('STRIPE_CURRENCY'),
        confirm: true,
      });
      return charge;
    } catch (err) {
      console.log(err);
    }
  }

  async allCard(user: UserEntity): Promise<any> {
    try {
      const users = await this.UserRepository.findOne({
        where: {
          id: user.id,
        },
      });

      const cards = await this.stripe.customers.listSources(
        users.stripeCustomerId,
        {
          object: 'card',
          limit: 5,
        },
      );
      const balance = await this.stripe.customers.listBalanceTransactions(
        'cus_NxT92iMgdudwRt',
      );
      console.log('][][[', balance);

      return cards;
    } catch (err) {
      console.log(err);
    }
  }
}
