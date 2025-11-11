import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: { name: string; slug: string; logoUrl?: string | null }) {
    return this.prisma.tenant.create({
      data: {
        name: input.name,
        slug: input.slug,
        logoUrl: input.logoUrl ?? null,
      },
    });
  }

  async getBySlug(slug: string) {
    return this.prisma.tenant.findUnique({ where: { slug } });
  }
}
