import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto';

@ApiTags('orders')
@Controller('orders')
@ApiHeader({ name: 'x-tenant-id', required: true })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  create(
    @Headers('x-tenant-id') tenantId: string,
    @Body() createOrderDto: CreateOrderDto
  ) {
    return this.ordersService.create(tenantId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders for tenant' })
  findAll(@Headers('x-tenant-id') tenantId: string) {
    return this.ordersService.findAll(tenantId);
  }

  @Get('by-number/:orderNumber')
  @ApiOperation({ summary: 'Get order by order number' })
  findByOrderNumber(
    @Headers('x-tenant-id') tenantId: string,
    @Param('orderNumber') orderNumber: string
  ) {
    return this.ordersService.findByOrderNumber(tenantId, orderNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  findOne(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string
  ) {
    return this.ordersService.findOne(tenantId, id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  updateStatus(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string,
    @Body() body: { status: string }
  ) {
    return this.ordersService.updateStatus(tenantId, id, body.status);
  }
}
