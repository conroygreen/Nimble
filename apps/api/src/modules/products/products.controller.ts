import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@ApiTags('products')
@Controller('products')
@ApiHeader({ name: 'x-tenant-id', required: true })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(
    @Headers('x-tenant-id') tenantId: string,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productsService.create(tenantId, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for tenant' })
  findAll(@Headers('x-tenant-id') tenantId: string) {
    return this.productsService.findAll(tenantId);
  }

  @Get('by-slug/:slug')
  @ApiOperation({ summary: 'Get product by slug' })
  findBySlug(
    @Headers('x-tenant-id') tenantId: string,
    @Param('slug') slug: string
  ) {
    return this.productsService.findBySlug(tenantId, slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  findOne(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string
  ) {
    return this.productsService.findOne(tenantId, id);
  }

  @Post(':id/calculate-price')
  @ApiOperation({ summary: 'Calculate product price with options' })
  calculatePrice(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string,
    @Body() body: { quantity: number; options: Record<string, string> }
  ) {
    return this.productsService.calculatePrice(
      tenantId,
      id,
      body.quantity,
      body.options
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  update(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(tenantId, id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product (soft delete)' })
  remove(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string
  ) {
    return this.productsService.remove(tenantId, id);
  }
}
