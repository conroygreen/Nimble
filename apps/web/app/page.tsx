import Link from 'next/link';

export default async function Home() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  let products: any[] = [];
  try {
    const res = await fetch(`${api}/products`, { cache: 'no-store' });
    products = await res.json();
  } catch (e) {
    products = [];
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Storefront</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <li key={p.id} className="border rounded p-4">
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="mt-2 flex gap-2">
              <Link className="text-blue-600 hover:underline" href={`/products/${p.id}`}>Configure</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
