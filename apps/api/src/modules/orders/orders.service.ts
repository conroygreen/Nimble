import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto';
import { OrderStatus } from '@nimble/core';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createOrderDto: CreateOrderDto) {
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        tenantId,
        customerId: createOrderDto.customerId,
        customerEmail: createOrderDto.customerEmail,
        shippingAddress: createOrderDto.shippingAddress,
        totalAmount: createOrderDto.totalAmount,
        paymentIntentId: createOrderDto.paymentIntentId,
        status: OrderStatus.NEW,
        items: {
          create: createOrderDto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            options: item.options,
            fileUrls: item.fileUrls,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Create initial job for the order
    await this.prisma.job.create({
      data: {
        orderId: order.id,
        status: 'PENDING',
        preflightStatus: 'PENDING',
      },
    });

    return order;
  }

  async findAll(tenantId: string) {
    return this.prisma.order.findMany({
      where: { tenantId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, tenantId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        customer: true,
        jobs: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateStatus(tenantId: string, id: string, status: string) {
    await this.findOne(tenantId, id);

    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async findByOrderNumber(tenantId: string, orderNumber: string) {
    const order = await this.prisma.order.findFirst({
      where: { orderNumber, tenantId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        jobs: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
