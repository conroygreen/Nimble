import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HealthModule } from '../health/health.module.js';
import { TenantModule } from '../tenant/tenant.module.js';
import { ProductModule } from '../product/product.module.js';
import { OrderModule } from '../order/order.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        // load root .env first if present, then local
        '../../.env',
        '.env',
      ],
    }),
    PrismaModule,
    HealthModule,
    TenantModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule {}
