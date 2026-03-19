"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/src/features/menu/components/ProductCard";
import {
  productCategories,
  products,
} from "@/src/features/menu/data/menu.data";

const BuildCoffeeModal = dynamic(
  () => import("@/src/features/menu/components/BuildCoffeeModal"),
  { ssr: false },
);

const SKELETON_ITEMS = Array.from({ length: 6 }, (_, index) => index);
const CATEGORY_SWITCH_SKELETON_MS = 240;
const MENU_ITEM_ENTRY_BASE_DELAY = 0.035;
const MENU_ITEM_ENTRY_DURATION = 0.2;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(productCategories[0]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isCategorySwitching, setIsCategorySwitching] = useState(false);

  const filteredProducts = useMemo(
    () => products.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const handleCustomize = useCallback((product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  }, []);

  const isCoffeeProduct = useCallback(
    (product) => product.category.toLowerCase().includes("coffee"),
    [],
  );

  const handleCategoryChange = useCallback(
    (category) => {
      if (category === activeCategory) {
        return;
      }

      setActiveCategory(category);
      setIsCategorySwitching(true);
    },
    [activeCategory],
  );

  useEffect(() => {
    if (!isCategorySwitching) {
      return undefined;
    }

    const switchTimeout = setTimeout(
      () => setIsCategorySwitching(false),
      CATEGORY_SWITCH_SKELETON_MS,
    );

    return () => clearTimeout(switchTimeout);
  }, [isCategorySwitching]);

  return (
    <div className="section-shell space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-(--muted)">
          Our Menu
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Slow-Brewed Favorites</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {productCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryChange(category)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              activeCategory === category
                ? "border-(--accent) bg-[rgba(198,139,89,0.2)] text-(--accent)"
                : "border-[rgba(245,233,220,0.2)] text-[rgba(245,233,220,0.8)] hover:-translate-y-0.5 hover:border-[rgba(245,233,220,0.4)] hover:bg-[rgba(245,233,220,0.12)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isCategorySwitching
          ? SKELETON_ITEMS.map((skeletonId) => (
              <article
                key={`skeleton-${skeletonId}`}
                className="menu-card-skeleton"
              >
                <div className="h-48 w-full border-b border-[rgba(245,233,220,0.07)] bg-[rgba(245,233,220,0.06)]" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 rounded-md bg-[rgba(245,233,220,0.08)]" />
                  <div className="h-3.5 w-full rounded-md bg-[rgba(245,233,220,0.08)]" />
                  <div className="h-3.5 w-4/5 rounded-md bg-[rgba(245,233,220,0.08)]" />
                </div>
              </article>
            ))
          : filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: MENU_ITEM_ENTRY_DURATION,
                  delay: Math.min(index, 8) * MENU_ITEM_ENTRY_BASE_DELAY,
                }}
              >
                <ProductCard
                  product={product}
                  priority={index < 2}
                  onCustomize={
                    isCoffeeProduct(product) ? handleCustomize : undefined
                  }
                />
              </motion.div>
            ))}
      </div>

      <BuildCoffeeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        product={selectedProduct}
      />
    </div>
  );
}
