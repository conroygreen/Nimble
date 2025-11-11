'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
}

export default function DemoStorefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock products for demo
    setProducts([
      {
        id: '1',
        name: 'Business Cards',
        slug: 'business-cards',
        description: 'Premium business cards with various finishes',
        basePrice: 49.99,
      },
      {
        id: '2',
        name: 'Flyers',
        slug: 'flyers',
        description: 'High-quality flyers for any occasion',
        basePrice: 79.99,
      },
      {
        id: '3',
        name: 'Posters',
        slug: 'posters',
        description: 'Large format posters',
        basePrice: 29.99,
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-3xl font-bold">Demo Print Shop</h1>
            </Link>
            <nav className="space-x-4">
              <Link href="/demo">
                <Button variant="secondary" size="sm">
                  Products
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Our Products</h2>
          <p className="text-lg text-muted-foreground">
            Choose from our selection of high-quality print products
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <span className="text-6xl">📄</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            ${product.basePrice.toFixed(2)}
          </span>
          <Link href={`/demo/products/${product.slug}`}>
            <Button>Configure</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
