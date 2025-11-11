import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nimble</h1>
          <nav className="space-x-4">
            <Link href="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
            <Link href="/demo">
              <Button>View Demo Store</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Multi-Tenant Printing SaaS Platform
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Empower printing companies with a white-label platform for B2B and
            B2C custom print products. Manage orders, products, and production
            workflows seamlessly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg">Explore Demo Storefront</Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Multi-Tenant Architecture"
              description="Each printing company gets their own branded subdomain with custom theming."
            />
            <FeatureCard
              title="Product Configurator"
              description="Dynamic pricing engine with live calculations based on options and quantity."
            />
            <FeatureCard
              title="Order Workflow"
              description="Complete production workflow from upload to preflight to shipping."
            />
            <FeatureCard
              title="File Management"
              description="Secure S3 uploads with preflight checks for DPI, bleed, and color space."
            />
            <FeatureCard
              title="Stripe Integration"
              description="Built-in payment processing and subscription billing for tenants."
            />
            <FeatureCard
              title="Admin Dashboards"
              description="Tenant admin panel and SaaS owner dashboard for complete control."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Nimble. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border rounded-lg">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
