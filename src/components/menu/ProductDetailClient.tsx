"use client";

import { useState } from "react";
import type { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { formatPrice } from "@/lib/utils";
import { ModelViewer } from "@/components/menu/ModelViewer";

export const ProductDetailClient = ({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) => {
  const { lang } = useLanguage();
  const [activeImage, setActiveImage] = useState(
    product.images[0] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
  );

  const title = lang === "fa" ? product.titleFa : product.titleEn;
  const desc = lang === "fa" ? product.fullDescFa : product.fullDescEn;
  const shortDesc = lang === "fa" ? product.shortDescFa : product.shortDescEn;
  const ingredients = lang === "fa" ? product.ingredientsFa : product.ingredientsEn;
  const allergens = lang === "fa" ? product.allergensFa : product.allergensEn;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="overflow-hidden rounded-3xl border border-brand/15 bg-card shadow-lg">
            <Image
              src={activeImage}
              alt={title}
              width={900}
              height={700}
              className="h-96 w-full object-cover"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(img)}
                className={`overflow-hidden rounded-2xl border ${
                  activeImage === img ? "border-ink" : "border-transparent"
                }`}
              >
                <Image src={img} alt={title} width={90} height={90} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted">FOODO</p>
          <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
          <p className="mt-2 text-muted">{shortDesc}</p>
          <div className="mt-4 text-xl font-semibold text-brand">
            {formatPrice(product.price, lang)}
          </div>
          {!product.isAvailable && (
            <div className="mt-3 inline-flex rounded-full bg-[#b42318] px-3 py-1 text-xs font-semibold text-ink">
              {lang === "fa" ? "ناموجود" : "Out of stock"}
            </div>
          )}
          {desc && <p className="mt-6 text-sm text-muted">{desc}</p>}

          {(ingredients || allergens) && (
            <div className="mt-6 rounded-3xl border border-brand/15 bg-card p-5 shadow-sm">
              {ingredients && (
                <div>
                  <h3 className="text-sm font-semibold">
                    {lang === "fa" ? "مواد تشکیل‌دهنده" : "Ingredients"}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{ingredients}</p>
                </div>
              )}
              {allergens && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold">
                    {lang === "fa" ? "آلرژن‌ها" : "Allergens"}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{allergens}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {product.model3dUrl && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            {lang === "fa" ? "نمای سه‌بعدی" : "3D View"}
          </h2>
          <div className="mt-4 h-96 overflow-hidden rounded-3xl border border-brand/15 bg-card shadow-lg">
            <ModelViewer url={product.model3dUrl} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {lang === "fa" ? "محصولات مرتبط" : "Related products"}
            </h2>
            <Link href="/" className="text-sm text-muted">
              {lang === "fa" ? "بازگشت به منو" : "Back to menu"}
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="group overflow-hidden rounded-3xl border border-brand/10 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-40">
                  <Image
                    src={item.images[0] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836"}
                    alt={lang === "fa" ? item.titleFa : item.titleEn}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold">
                    {lang === "fa" ? item.titleFa : item.titleEn}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {formatPrice(item.price, lang)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
