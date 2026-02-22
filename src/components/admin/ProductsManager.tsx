"use client";

import { useEffect, useState } from "react";
import type { Category, Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

const emptyForm = {
  categoryId: "",
  titleFa: "",
  titleEn: "",
  shortDescFa: "",
  shortDescEn: "",
  fullDescFa: "",
  fullDescEn: "",
  ingredientsFa: "",
  ingredientsEn: "",
  allergensFa: "",
  allergensEn: "",
  price: 0,
  imagesInput: "",
  tagsInput: "",
  model3dUrl: "",
  isAvailable: true,
  sortOrder: 0,
};

export const ProductsManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const [categoriesRes, productsRes] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/products"),
    ]);
    const categoriesData = await categoriesRes.json();
    const productsData = await productsRes.json();
    setCategories(categoriesData.categories || []);
    setProducts(productsData.products || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const payload = {
      categoryId: form.categoryId,
      titleFa: form.titleFa,
      titleEn: form.titleEn,
      shortDescFa: form.shortDescFa,
      shortDescEn: form.shortDescEn,
      fullDescFa: form.fullDescFa || null,
      fullDescEn: form.fullDescEn || null,
      ingredientsFa: form.ingredientsFa || null,
      ingredientsEn: form.ingredientsEn || null,
      allergensFa: form.allergensFa || null,
      allergensEn: form.allergensEn || null,
      price: Number(form.price) || 0,
      currency: "TOMAN",
      images: form.imagesInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      tags: form.tagsInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      model3dUrl: form.model3dUrl || null,
      isAvailable: form.isAvailable,
      sortOrder: Number(form.sortOrder) || 0,
    };

    const response = await fetch(
      editingId ? `/api/products/${editingId}` : "/api/products",
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

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      categoryId: product.categoryId,
      titleFa: product.titleFa,
      titleEn: product.titleEn,
      shortDescFa: product.shortDescFa,
      shortDescEn: product.shortDescEn,
      fullDescFa: product.fullDescFa || "",
      fullDescEn: product.fullDescEn || "",
      ingredientsFa: product.ingredientsFa || "",
      ingredientsEn: product.ingredientsEn || "",
      allergensFa: product.allergensFa || "",
      allergensEn: product.allergensEn || "",
      price: product.price,
      imagesInput: product.images.join(", "),
      tagsInput: product.tags.join(", "),
      model3dUrl: product.model3dUrl || "",
      isAvailable: product.isAvailable,
      sortOrder: product.sortOrder,
    });
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${productId}`, { method: "DELETE" });
    await load();
  };

  const categoryName = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.titleEn || "-";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div className="rounded-3xl border border-brand/15 bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Product" : "New Product"}
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              value={form.categoryId}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, categoryId: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.titleEn}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
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
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, titleEn: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Short Desc (FA)</label>
              <input
                value={form.shortDescFa}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, shortDescFa: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Short Desc (EN)</label>
              <input
                value={form.shortDescEn}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, shortDescEn: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Full Desc (FA)</label>
              <textarea
                value={form.fullDescFa}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, fullDescFa: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Full Desc (EN)</label>
              <textarea
                value={form.fullDescEn}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, fullDescEn: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Ingredients (FA)</label>
              <input
                value={form.ingredientsFa}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, ingredientsFa: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Ingredients (EN)</label>
              <input
                value={form.ingredientsEn}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, ingredientsEn: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Allergens (FA)</label>
              <input
                value={form.allergensFa}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, allergensFa: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Allergens (EN)</label>
              <input
                value={form.allergensEn}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, allergensEn: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Price (Toman)</label>
              <input
                type="number"
                value={form.price}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, price: Number(event.target.value) }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, sortOrder: Number(event.target.value) }))
                }
                className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Image URLs (comma-separated)</label>
            <input
              value={form.imagesInput}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, imagesInput: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Tags (comma-separated)</label>
            <input
              value={form.tagsInput}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, tagsInput: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
            />
          </div>
          <div>
            <label className="text-sm font-medium">3D Model URL (GLB/GLTF)</label>
            <input
              value={form.model3dUrl}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, model3dUrl: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-brand/30 bg-card px-4 py-3 text-ink"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, isAvailable: event.target.checked }))
              }
            />
            <span className="text-sm">Available</span>
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
          <h2 className="text-lg font-semibold">Products</h2>
          <button
            onClick={load}
            className="rounded-full border border-brand/30 px-4 py-2 text-sm text-ink"
          >
            Refresh
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-3 rounded-2xl border border-brand/10 bg-surface px-4 py-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold">{product.titleEn}</p>
                <p className="text-xs text-muted">
                  {categoryName(product.categoryId)} •{" "}
                  {formatPrice(product.price, "en")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="rounded-full border border-brand/30 px-3 py-1 text-xs text-ink"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
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

