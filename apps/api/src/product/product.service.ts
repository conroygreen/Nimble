import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto, UpdateProductDto } from './dto.js';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  list(tenantId?: string) {
    return this.prisma.product.findMany({
      where: tenantId ? { tenantId, active: true } : { active: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  get(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        tenantId: dto.tenantId,
        name: dto.name,
        sku: dto.sku,
        type: dto.type,
        optionsSchema: dto.optionsSchema as any,
        active: dto.active ?? true,
      },
    });
  }

  update(id: string, dto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        sku: dto.sku,
        type: dto.type,
        optionsSchema: dto.optionsSchema as any,
        active: dto.active,
      },
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
