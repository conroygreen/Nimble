import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status', () => {
    const result = controller.get();
    expect(result).toEqual({
      ok: true,
      service: 'api'
    });
  });

  it('should return ok status as true', () => {
    const result = controller.get();
    expect(result.ok).toBe(true);
  });

  it('should return service name as api', () => {
    const result = controller.get();
    expect(result.service).toBe('api');
  });
});
