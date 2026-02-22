import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [productCount, categoryCount, activeCount, outOfStockCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.product.count({ where: { isAvailable: true } }),
      prisma.product.count({ where: { isAvailable: false } }),
    ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted">
          Quick overview of your FOODO menu data.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total products", value: productCount },
          { label: "Categories", value: categoryCount },
          { label: "Active items", value: activeCount },
          { label: "Out of stock", value: outOfStockCount },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
