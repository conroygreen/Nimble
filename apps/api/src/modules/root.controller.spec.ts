import { Test, TestingModule } from '@nestjs/testing';
import { RootController } from './root.controller';

describe('RootController', () => {
  let controller: RootController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
    }).compile();

    controller = module.get<RootController>(RootController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return API information', () => {
    const result = controller.root();
    expect(result).toEqual({
      name: 'Nimble API',
      version: '0.1.0',
      message: 'Welcome. See /v1/health for service status.',
      docs: '/v1',
      health: '/v1/health'
    });
  });

  it('should have correct name', () => {
    const result = controller.root();
    expect(result.name).toBe('Nimble API');
  });

  it('should have correct version', () => {
    const result = controller.root();
    expect(result.version).toBe('0.1.0');
  });

  it('should have health endpoint reference', () => {
    const result = controller.root();
    expect(result.health).toBe('/v1/health');
  });
});
