import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    AuthModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
