import { ProductsManager } from "@/components/admin/ProductsManager";

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Product Management</h1>
        <p className="text-sm text-muted">
          Manage items, prices, availability, and bilingual content.
        </p>
      </div>
      <ProductsManager />
    </div>
  );
}
