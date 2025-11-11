import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProductsAdmin() {
  const mockProducts = [
    { id: '1', name: 'Business Cards', basePrice: 49.99, active: true },
    { id: '2', name: 'Flyers', basePrice: 79.99, active: true },
    { id: '3', name: 'Posters', basePrice: 29.99, active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nimble Admin</h1>
          <nav className="space-x-4">
            <Link href="/admin">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Products</h2>
            <p className="text-muted-foreground">
              Manage your product catalog
            </p>
          </div>
          <Button>Add Product</Button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Base Price</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">${product.basePrice.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
