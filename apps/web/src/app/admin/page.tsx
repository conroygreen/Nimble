import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nimble Admin</h1>
          <nav className="space-x-4">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your printing business
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Orders" value="0" />
          <StatCard title="Active Products" value="3" />
          <StatCard title="Pending Orders" value="0" />
          <StatCard title="Revenue" value="$0.00" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Products"
            description="Manage your product catalog"
            href="/admin/products"
            icon="📦"
          />
          <ActionCard
            title="Orders"
            description="View and manage orders"
            href="/admin/orders"
            icon="📋"
          />
          <ActionCard
            title="Settings"
            description="Configure your store"
            href="/admin/settings"
            icon="⚙️"
          />
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button>Manage</Button>
      </div>
    </Link>
  );
}
