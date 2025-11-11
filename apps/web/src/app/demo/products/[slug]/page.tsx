'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProductConfigurator({
  params,
}: {
  params: { slug: string };
}) {
  const [quantity, setQuantity] = useState(500);
  const [selectedOptions, setSelectedOptions] = useState({
    finish: 'Matte',
    corners: 'Square',
  });
  const [calculatedPrice, setCalculatedPrice] = useState(149.99);

  // Mock product data
  const product = {
    name: 'Business Cards',
    description: 'Premium business cards with various finishes',
    basePrice: 49.99,
    options: [
      {
        id: 'finish',
        name: 'Finish',
        values: ['Matte', 'Gloss', 'Soft Touch'],
      },
      {
        id: 'corners',
        name: 'Corner Style',
        values: ['Square', 'Rounded'],
      },
    ],
  };

  const handleOptionChange = (optionId: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: value }));
    // In real app, this would call API to recalculate price
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    // In real app, this would call API to recalculate price
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/demo">
              <h1 className="text-3xl font-bold">Demo Print Shop</h1>
            </Link>
            <Link href="/demo">
              <Button variant="secondary" size="sm">
                ← Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Preview */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Product Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <span className="text-9xl">📄</span>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Specifications:</strong>
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Size: 3.5" x 2"</li>
                    <li>• Required DPI: 300</li>
                    <li>• Bleed: 0.125"</li>
                    <li>• Color Space: CMYK</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Configuration */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <Card>
              <CardHeader>
                <CardTitle>Quantity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value))
                    }
                    min={100}
                    step={50}
                  />
                  <div className="flex gap-2">
                    {[100, 250, 500, 1000].map((q) => (
                      <Button
                        key={q}
                        variant={quantity === q ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleQuantityChange(q)}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            {product.options.map((option) => (
              <Card key={option.id}>
                <CardHeader>
                  <CardTitle>{option.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {option.values.map((value) => (
                      <Button
                        key={value}
                        variant={
                          selectedOptions[option.id] === value
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() => handleOptionChange(option.id, value)}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Design Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your files here, or click to browse
                  </p>
                  <Button variant="outline">Choose Files</Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Accepted formats: PDF, AI, EPS (max 50MB)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Price & Checkout */}
            <Card className="border-primary">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total Price:</span>
                  <span className="text-4xl font-bold">
                    ${calculatedPrice.toFixed(2)}
                  </span>
                </div>
                <Button size="lg" className="w-full">
                  Add to Cart
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  * Price includes {quantity} units with selected options
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
