interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  return (
    <main className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Product: {params.slug}</h1>
      <p className="text-gray-600">Configurator and live pricing coming soon.</p>
    </main>
  );
}
