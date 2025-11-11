import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a demo tenant
  const tenant = await prisma.tenant.upsert({
    where: { subdomain: 'demo' },
    update: {},
    create: {
      name: 'Demo Print Shop',
      subdomain: 'demo',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      fontFamily: 'Inter',
      subscriptionTier: 'PRO',
      subscriptionStatus: 'ACTIVE',
    },
  });

  console.log('✅ Created tenant:', tenant.name);

  // Create a demo admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.printshop.com' },
    update: {},
    create: {
      email: 'admin@demo.printshop.com',
      name: 'Admin User',
      role: 'TENANT_ADMIN',
      tenantId: tenant.id,
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create sample products
  const products = [
    {
      name: 'Business Cards',
      slug: 'business-cards',
      description: 'Premium business cards with various finishes',
      basePrice: 49.99,
      trimSize: '3.5x2',
      requiredDpi: 300,
      requiredBleed: 0.125,
      requiredColorSpace: 'CMYK',
      quantityBreaks: [
        { minQuantity: 100, pricePerUnit: 0.49 },
        { minQuantity: 250, pricePerUnit: 0.39 },
        { minQuantity: 500, pricePerUnit: 0.29 },
        { minQuantity: 1000, pricePerUnit: 0.19 },
      ],
      options: [
        {
          id: 'finish',
          name: 'Finish',
          type: 'select',
          required: true,
          values: ['Matte', 'Gloss', 'Soft Touch'],
          defaultValue: 'Matte',
        },
        {
          id: 'corners',
          name: 'Corner Style',
          type: 'select',
          required: true,
          values: ['Square', 'Rounded'],
          defaultValue: 'Square',
        },
      ],
      optionMarkups: {
        'finish.Gloss': 5,
        'finish.Soft Touch': 10,
        'corners.Rounded': 5,
      },
      tenantId: tenant.id,
    },
    {
      name: 'Flyers',
      slug: 'flyers',
      description: 'High-quality flyers for any occasion',
      basePrice: 79.99,
      trimSize: '8.5x11',
      requiredDpi: 300,
      requiredBleed: 0.125,
      requiredColorSpace: 'CMYK',
      quantityBreaks: [
        { minQuantity: 100, pricePerUnit: 0.79 },
        { minQuantity: 250, pricePerUnit: 0.59 },
        { minQuantity: 500, pricePerUnit: 0.49 },
        { minQuantity: 1000, pricePerUnit: 0.39 },
      ],
      options: [
        {
          id: 'paper',
          name: 'Paper Weight',
          type: 'select',
          required: true,
          values: ['80lb', '100lb', '120lb'],
          defaultValue: '100lb',
        },
        {
          id: 'sides',
          name: 'Printing',
          type: 'select',
          required: true,
          values: ['Single-sided', 'Double-sided'],
          defaultValue: 'Single-sided',
        },
      ],
      optionMarkups: {
        'paper.120lb': 10,
        'sides.Double-sided': 15,
      },
      tenantId: tenant.id,
    },
    {
      name: 'Posters',
      slug: 'posters',
      description: 'Large format posters',
      basePrice: 29.99,
      trimSize: '18x24',
      requiredDpi: 150,
      requiredBleed: 0.25,
      requiredColorSpace: 'CMYK',
      quantityBreaks: [
        { minQuantity: 1, pricePerUnit: 29.99 },
        { minQuantity: 5, pricePerUnit: 24.99 },
        { minQuantity: 10, pricePerUnit: 19.99 },
        { minQuantity: 25, pricePerUnit: 14.99 },
      ],
      options: [
        {
          id: 'material',
          name: 'Material',
          type: 'select',
          required: true,
          values: ['Paper', 'Canvas', 'Vinyl'],
          defaultValue: 'Paper',
        },
      ],
      optionMarkups: {
        'material.Canvas': 15,
        'material.Vinyl': 10,
      },
      tenantId: tenant.id,
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { tenantId_slug: { tenantId: tenant.id, slug: productData.slug } },
      update: {},
      create: productData,
    });
    console.log('✅ Created product:', product.name);
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
