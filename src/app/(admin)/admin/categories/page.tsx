import { CategoriesManager } from "@/components/admin/CategoriesManager";

export default function CategoriesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Category Management</h1>
        <p className="text-sm text-muted">
          Create, edit, and organize menu categories.
        </p>
      </div>
      <CategoriesManager />
    </div>
  );
}
