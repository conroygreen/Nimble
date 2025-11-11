import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  NEW = 'NEW',
  PREFLIGHT = 'PREFLIGHT',
  ON_PRESS = 'ON_PRESS',
  FINISHING = 'FINISHING',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

export class OrderItemInput {
  @IsString()
  productId!: string;

  @IsNumber()
  quantity!: number;

  @IsObject()
  specs!: Record<string, unknown>;
}

export class CreateOrderDto {
  @IsString()
  tenantId!: string;

  @IsString()
  @IsOptional()
  customerId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items!: OrderItemInput[];
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
