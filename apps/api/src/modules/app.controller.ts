import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): { 
    name: string; 
    version: string; 
    status: string; 
    endpoints: Record<string, string>;
  } {
    return {
      name: 'PrintSaaS API',
      version: '0.1.0',
      status: 'running',
      endpoints: {
        health: '/v1/health',
        docs: '/v1/docs (coming soon)',
      }
    };
  }
}
