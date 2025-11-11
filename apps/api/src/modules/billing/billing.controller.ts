import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { BillingService } from './billing.service';

@ApiTags('billing')
@Controller('billing')
@ApiHeader({ name: 'x-tenant-id', required: true })
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('payment-intent')
  @ApiOperation({ summary: 'Create Stripe payment intent' })
  async createPaymentIntent(@Body() body: { amount: number; currency?: string }) {
    return this.billingService.createPaymentIntent(body.amount, body.currency);
  }

  @Post('checkout-session')
  @ApiOperation({ summary: 'Create Stripe checkout session' })
  async createCheckoutSession(
    @Headers('x-tenant-id') tenantId: string,
    @Body()
    body: {
      items: Array<{ name: string; amount: number; quantity: number }>;
      successUrl: string;
      cancelUrl: string;
    }
  ) {
    return this.billingService.createCheckoutSession(
      tenantId,
      body.items,
      body.successUrl,
      body.cancelUrl
    );
  }
}
