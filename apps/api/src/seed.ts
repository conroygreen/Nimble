import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      name: 'Demo Print Co',
      slug: 'demo',
      logoUrl: null,
    },
  });

  await prisma.product.upsert({
    where: { id: 'seed-product-1' },
    update: {},
    create: {
      id: 'seed-product-1',
      tenantId: tenant.id,
      name: 'Business Cards',
      description: 'Standard 3.5x2 inch cards',
      basePrice: 20,
      optionsSchema: {
        size: ["3.5x2"],
        paper: ["14pt", "16pt"],
        finish: ["matte", "gloss"]
      },
      active: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
