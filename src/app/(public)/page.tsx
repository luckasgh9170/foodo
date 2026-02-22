import { prisma } from "@/lib/prisma";
import { MenuClient } from "@/components/menu/MenuClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, products, settings] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.setting.findUnique({ where: { id: "singleton" } }),
  ]);

  return (
    <MenuClient
      categories={categories}
      products={products}
      settings={settings}
    />
  );
}
