import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId, active: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, tenantId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findBySlug(tenantId: string, slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { tenantId_slug: { tenantId, slug } },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(tenantId: string, id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(tenantId, id);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);

    // Soft delete by setting active to false
    return this.prisma.product.update({
      where: { id },
      data: { active: false },
    });
  }

  async calculatePrice(
    tenantId: string,
    productId: string,
    quantity: number,
    options: Record<string, string>
  ): Promise<number> {
    const product = await this.findOne(tenantId, productId);

    let price = product.basePrice;

    // Apply quantity breaks
    if (product.quantityBreaks) {
      const breaks = product.quantityBreaks as Array<{
        minQuantity: number;
        pricePerUnit: number;
      }>;
      const applicableBreak = breaks
        .filter((b) => quantity >= b.minQuantity)
        .sort((a, b) => b.minQuantity - a.minQuantity)[0];

      if (applicableBreak) {
        price = applicableBreak.pricePerUnit * quantity;
      } else {
        price = product.basePrice;
      }
    }

    // Apply option markups
    if (product.optionMarkups && options) {
      const markups = product.optionMarkups as Record<string, number>;
      for (const [optionId, value] of Object.entries(options)) {
        const markupKey = `${optionId}.${value}`;
        if (markups[markupKey]) {
          price += markups[markupKey];
        }
      }
    }

    return Math.round(price * 100) / 100; // Round to 2 decimal places
  }
}
