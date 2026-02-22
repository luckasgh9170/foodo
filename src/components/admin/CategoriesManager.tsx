"use client";

import { useEffect, useState } from "react";
import type { Category } from "@prisma/client";
import { slugify } from "@/lib/utils";

const emptyForm = {
  titleFa: "",
  titleEn: "",
  slug: "",
  sortOrder: 0,
  isActive: true,
};

export const CategoriesManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data.categories || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder) || 0,
      isActive: Boolean(form.isActive),
    };

    const response = await fetch(
      editingId ? `/api/categories/${editingId}` : "/api/categories",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setLoading(false);
    if (response.ok) {
      setForm({ ...emptyForm });
      setEditingId(null);
      await load();
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setForm({
      titleFa: category.titleFa,
      titleEn: category.titleEn,
      slug: category.slug,
      sortOrder: category.sortOrder,
      isActive: category.isActive,
    });
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/categories/${categoryId}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-3xl border border-brand/15 bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Category" : "New Category"}
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Title (FA)</label>
            <input
              value={form.titleFa}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, titleFa: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Title (EN)</label>
            <input
              value={form.titleEn}
              onChange={(event) => {
                const titleEn = event.target.value;
                setForm((prev) => ({
                  ...prev,
                  titleEn,
                  slug: prev.slug || slugify(titleEn),
                }));
              }}
              className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Slug</label>
            <input
              value={form.slug}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, slug: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    sortOrder: Number(event.target.value),
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, isActive: event.target.checked }))
                }
              />
              <span className="text-sm">Active</span>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-black"
          >
            {loading ? "Saving..." : editingId ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-brand/15 bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button
            onClick={load}
            className="rounded-full border border-brand/30 px-4 py-2 text-sm text-ink"
          >
            Refresh
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-2xl border border-brand/10 bg-surface px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold">{category.titleEn}</p>
                <p className="text-xs text-muted">{category.titleFa}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="rounded-full border border-brand/30 px-3 py-1 text-xs text-ink"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="rounded-full border border-red-400/40 px-3 py-1 text-xs text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
