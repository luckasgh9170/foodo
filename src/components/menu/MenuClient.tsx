"use client";

import { useMemo, useState, useEffect } from "react";
import type { Category, Product, Setting } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { useSocket } from "@/components/SocketProvider";
import { formatPrice } from "@/lib/utils";
import { SOCKET_EVENTS } from "@/lib/constants";

const productTitle = (product: Product, lang: "fa" | "en") =>
  lang === "fa" ? product.titleFa : product.titleEn;

const productDesc = (product: Product, lang: "fa" | "en") =>
  lang === "fa" ? product.shortDescFa : product.shortDescEn;

export const MenuClient = ({
  categories: initialCategories,
  products: initialProducts,
  settings,
}: {
  categories: Category[];
  products: Product[];
  settings: Setting | null;
}) => {
  const { lang } = useLanguage();
  const socket = useSocket();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [availability, setAvailability] = useState<"all" | "available" | "out">(
    "all"
  );

  useEffect(() => {
    if (settings?.primaryColor) {
      document.documentElement.style.setProperty(
        "--color-primary",
        settings.primaryColor
      );
    }
    if (settings?.secondaryColor) {
      document.documentElement.style.setProperty(
        "--color-accent",
        settings.secondaryColor
      );
    }
  }, [settings]);

  useEffect(() => {
    if (!socket) return;

    const onProductUpdate = (product: Product) => {
      setProducts((prev) =>
        prev.map((item) => (item.id === product.id ? product : item))
      );
    };

    const onProductCreate = (product: Product) => {
      setProducts((prev) => [product, ...prev]);
    };

    const onProductDelete = (payload: { id: string }) => {
      setProducts((prev) => prev.filter((item) => item.id !== payload.id));
    };

    const onCategoryUpdate = (category: Category) => {
      setCategories((prev) =>
        prev.map((item) => (item.id === category.id ? category : item))
      );
    };

    const onCategoryCreate = (category: Category) => {
      setCategories((prev) => [category, ...prev]);
    };

    const onCategoryDelete = (category: Category) => {
      setCategories((prev) => prev.filter((item) => item.id !== category.id));
    };

    const onSettingsUpdate = (next: Setting) => {
      if (next.primaryColor) {
        document.documentElement.style.setProperty(
          "--color-primary",
          next.primaryColor
        );
      }
      if (next.secondaryColor) {
        document.documentElement.style.setProperty(
          "--color-accent",
          next.secondaryColor
        );
      }
    };

    socket.on(SOCKET_EVENTS.PRODUCT_UPDATED, onProductUpdate);
    socket.on(SOCKET_EVENTS.PRODUCT_CREATED, onProductCreate);
    socket.on(SOCKET_EVENTS.PRODUCT_DELETED, onProductDelete);
    socket.on(SOCKET_EVENTS.CATEGORY_UPDATED, onCategoryUpdate);
    socket.on(SOCKET_EVENTS.CATEGORY_CREATED, onCategoryCreate);
    socket.on(SOCKET_EVENTS.CATEGORY_DELETED, onCategoryDelete);
    socket.on(SOCKET_EVENTS.SETTINGS_UPDATED, onSettingsUpdate);

    return () => {
      socket.off(SOCKET_EVENTS.PRODUCT_UPDATED, onProductUpdate);
      socket.off(SOCKET_EVENTS.PRODUCT_CREATED, onProductCreate);
      socket.off(SOCKET_EVENTS.PRODUCT_DELETED, onProductDelete);
      socket.off(SOCKET_EVENTS.CATEGORY_UPDATED, onCategoryUpdate);
      socket.off(SOCKET_EVENTS.CATEGORY_CREATED, onCategoryCreate);
      socket.off(SOCKET_EVENTS.CATEGORY_DELETED, onCategoryDelete);
      socket.off(SOCKET_EVENTS.SETTINGS_UPDATED, onSettingsUpdate);
    };
  }, [socket]);

  const featured = useMemo(() => {
    return products
      .filter((item) => item.tags.includes("Popular") || item.tags.includes("Signature"))
      .slice(0, 4);
  }, [products]);

  const visibleCategories = useMemo(
    () =>
      categories
        .filter((category) => category.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [categories]
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory =
          activeCategory === "all" || item.categoryId === activeCategory;
        const matchesQuery =
          productTitle(item, lang).toLowerCase().includes(query.toLowerCase()) ||
          productDesc(item, lang).toLowerCase().includes(query.toLowerCase());
        const matchesAvailability =
          availability === "all" ||
          (availability === "available" ? item.isAvailable : !item.isAvailable);
        return matchesCategory && matchesQuery && matchesAvailability;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [products, activeCategory, query, availability, lang]);

  const heroSubtitle =
    lang === "fa"
      ? "کافه و فست‌فود با کیفیت ممتاز"
      : "Cafe and fast food with premium quality";

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1b1b1b,#0b0b0b)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase text-muted">FOODO</p>
            <p className="mt-4 text-lg text-muted">{heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={lang === "fa" ? "جستجو در منو" : "Search menu"}
                className="w-full rounded-full border border-brand/30 bg-[#141414] px-4 py-3 text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <select
                value={availability}
                onChange={(event) =>
                  setAvailability(event.target.value as "all" | "available" | "out")
                }
                className="rounded-full border border-brand/30 bg-[#141414] px-4 py-3 text-sm text-ink"
              >
                <option value="all">
                  {lang === "fa" ? "همه" : "All"}
                </option>
                <option value="available">
                  {lang === "fa" ? "موجود" : "Available"}
                </option>
                <option value="out">
                  {lang === "fa" ? "ناموجود" : "Out of stock"}
                </option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="menu" className="mx-auto mt-10 max-w-6xl px-4">
        <div className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-2">
          <button
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === "all"
                ? "bg-brand text-black"
                : "border border-brand/30 bg-[#141414] text-ink"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            {lang === "fa" ? "همه دسته‌ها" : "All categories"}
          </button>
          {visibleCategories.map((category) => (
            <button
              key={category.id}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category.id
                  ? "bg-brand text-black"
                  : "border border-brand/30 bg-[#141414] text-ink"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {lang === "fa" ? category.titleFa : category.titleEn}
            </button>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto mt-12 max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {lang === "fa" ? "موارد ویژه" : "Featured"}
            </h2>
            <span className="text-sm text-muted">
              {lang === "fa"
                ? "منتخب‌های سرآشپز"
                : "Chef selections"}
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {featured.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="group overflow-hidden rounded-3xl border border-brand/10 bg-[#141414] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-44">
                  <Image
                    src={item.images[0] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836"}
                    alt={productTitle(item, lang)}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {productTitle(item, lang)}
                    </h3>
                    <span className="text-sm font-semibold text-brand">
                      {formatPrice(item.price, lang)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {productDesc(item, lang)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-12 max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {lang === "fa" ? "تمام آیتم‌ها" : "All items"}
          </h2>
          <span className="text-sm text-muted">
            {filteredProducts.length} {lang === "fa" ? "آیتم" : "items"}
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="group overflow-hidden rounded-3xl border border-brand/10 bg-[#141414] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-44">
                <Image
                  src={item.images[0] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836"}
                  alt={productTitle(item, lang)}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {!item.isAvailable && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#b42318] px-3 py-1 text-xs font-semibold text-ink">
                    {lang === "fa" ? "ناموجود" : "Out of stock"}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {productTitle(item, lang)}
                  </h3>
                  <span className="text-sm font-semibold text-brand">
                    {formatPrice(item.price, lang)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  {productDesc(item, lang)}
                </p>
                {item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand/20 px-2 py-1 text-xs text-brand"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
