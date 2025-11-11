import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1', {
    exclude: ['/'],
  });
  await app.listen(4000);
}

bootstrap().catch(err => {
  // eslint-disable-next-line no-console
  console.error('API bootstrap error', err);
  process.exit(1);
});
