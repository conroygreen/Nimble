import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OrdersAdmin() {
  const mockOrders = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customerEmail: 'customer@example.com',
      totalAmount: 149.99,
      status: 'NEW',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customerEmail: 'john@example.com',
      totalAmount: 249.99,
      status: 'PREFLIGHT',
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      customerEmail: 'jane@example.com',
      totalAmount: 89.99,
      status: 'SHIPPED',
      createdAt: '2024-01-13',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-blue-100 text-blue-800',
      PREFLIGHT: 'bg-yellow-100 text-yellow-800',
      PRESS: 'bg-purple-100 text-purple-800',
      FINISH: 'bg-orange-100 text-orange-800',
      SHIPPED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

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
            <h2 className="text-3xl font-bold mb-2">Orders</h2>
            <p className="text-muted-foreground">
              View and manage customer orders
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="text-left p-4 font-semibold">Order Number</th>
                <th className="text-left p-4 font-semibold">Customer</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-right p-4 font-semibold">Amount</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-medium">{order.orderNumber}</td>
                  <td className="p-4">{order.customerEmail}</td>
                  <td className="p-4 text-muted-foreground">
                    {order.createdAt}
                  </td>
                  <td className="p-4 text-right font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {mockOrders.length} of {mockOrders.length} orders
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
