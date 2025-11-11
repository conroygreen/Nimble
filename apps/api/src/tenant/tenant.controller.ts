import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TenantService } from './tenant.service.js';

class CreateTenantDto {
  name!: string;
  slug!: string;
  logoUrl?: string;
}

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    return this.tenantService.create(dto);
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.tenantService.getBySlug(slug);
  }
}
