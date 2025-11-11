import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class RootController {
  @Get()
  root() {
    return {
      name: 'Nimble API',
      version: '0.1.0',
      message: 'Welcome. See /v1/health for service status.',
      docs: '/v1',
      health: '/v1/health'
    };
  }
}
