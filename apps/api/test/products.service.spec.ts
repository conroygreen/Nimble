import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../src/modules/products/products.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculatePrice', () => {
    it('should calculate base price for small quantity', async () => {
      const mockProduct = {
        id: '1',
        name: 'Business Cards',
        basePrice: 49.99,
        quantityBreaks: [
          { minQuantity: 100, pricePerUnit: 0.49 },
          { minQuantity: 500, pricePerUnit: 0.29 },
        ],
        optionMarkups: {},
        tenantId: 'tenant-1',
      };

      jest.spyOn(prisma.product, 'findFirst').mockResolvedValue(mockProduct as any);

      const price = await service.calculatePrice('tenant-1', '1', 50, {});

      expect(price).toBe(49.99);
    });

    it('should apply quantity breaks correctly', async () => {
      const mockProduct = {
        id: '1',
        name: 'Business Cards',
        basePrice: 49.99,
        quantityBreaks: [
          { minQuantity: 100, pricePerUnit: 0.49 },
          { minQuantity: 500, pricePerUnit: 0.29 },
        ],
        optionMarkups: {},
        tenantId: 'tenant-1',
      };

      jest.spyOn(prisma.product, 'findFirst').mockResolvedValue(mockProduct as any);

      const price = await service.calculatePrice('tenant-1', '1', 500, {});

      expect(price).toBe(145); // 500 * 0.29
    });

    it('should apply option markups', async () => {
      const mockProduct = {
        id: '1',
        name: 'Business Cards',
        basePrice: 49.99,
        quantityBreaks: [
          { minQuantity: 100, pricePerUnit: 0.49 },
        ],
        optionMarkups: {
          'finish.Gloss': 5,
          'corners.Rounded': 3,
        },
        tenantId: 'tenant-1',
      };

      jest.spyOn(prisma.product, 'findFirst').mockResolvedValue(mockProduct as any);

      const price = await service.calculatePrice('tenant-1', '1', 100, {
        finish: 'Gloss',
        corners: 'Rounded',
      });

      expect(price).toBe(57); // 100 * 0.49 + 5 + 3
    });
  });

  describe('findAll', () => {
    it('should return only active products for tenant', async () => {
      const mockProducts = [
        { id: '1', name: 'Product 1', active: true, tenantId: 'tenant-1' },
        { id: '2', name: 'Product 2', active: true, tenantId: 'tenant-1' },
      ];

      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(mockProducts as any);

      const products = await service.findAll('tenant-1');

      expect(products).toHaveLength(2);
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { tenantId: 'tenant-1', active: true },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
