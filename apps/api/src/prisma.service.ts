import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  private client: any = null;

  async onModuleInit() {
    try {
      // Dynamically import PrismaClient
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { PrismaClient } = await import('@prisma/client');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      this.client = new PrismaClient();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.client.$connect();
      this.logger.log('Successfully connected to database');
    } catch {
      this.logger.warn(
        'PrismaClient not available. Run "pnpm db:generate" and configure DATABASE_URL to enable database access.',
      );
      // Service will work but database operations will fail
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.client.$disconnect();
    }
  }

  // Proxy methods to the client
  get tenant() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.client?.tenant;
  }

  get user() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.client?.user;
  }

  get membership() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.client?.membership;
  }

  get product() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.client?.product;
  }

  get customer() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.client?.customer;
  }

  get order() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return this.client?.order;
  }
  // Add other model accessors as needed
}
