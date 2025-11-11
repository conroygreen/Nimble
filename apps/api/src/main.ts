import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
    ],
  });
  await app.listen(4000, '0.0.0.0');
}

bootstrap().catch(err => {
  // eslint-disable-next-line no-console
  console.error('API bootstrap error', err);
  process.exit(1);
});
