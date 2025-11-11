import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto, OrderStatus } from './dto.js';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    // naive total calculation
    const itemsData = await Promise.all(
      dto.items.map(async (it) => {
        const product = await this.prisma.product.findUnique({ where: { id: it.productId } });
        const unitPrice = product?.basePrice ?? 0;
        const lineTotal = unitPrice * it.quantity;
        return { ...it, unitPrice, lineTotal };
      }),
    );
    const total = itemsData.reduce((s, it) => s + it.lineTotal, 0);
    return this.prisma.order.create({
      data: {
        tenantId: dto.tenantId,
        status: OrderStatus.NEW,
        total,
        currency: 'USD',
        items: {
          create: itemsData.map((it) => ({
            productId: it.productId,
            qty: it.quantity,
            options: it.options as any,
            unitPrice: it.unitPrice,
            lineTotal: it.lineTotal,
          })),
        },
      },
      include: { items: true },
    });
  }

  get(id: string) {
    return this.prisma.order.findUnique({ where: { id }, include: { items: true } });
  }

  updateStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({ where: { id }, data: { status } });
  }
}
