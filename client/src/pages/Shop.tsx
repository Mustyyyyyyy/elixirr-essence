import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { products } from "../data/products";
import { ProductGrid } from "../components/ProductGrid";
import { ProductsSkeleton } from "../components/Skeletons";
import { ProductQuickView } from "../components/ProductQuickView";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";

type SortOption = "default" | "price-low" | "price-high" | "name";

export function Shop() {
  const { loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let result = [...products];

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [categoryFilter, searchQuery, sort]);

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
            SHOP ALL
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
            Statement pieces for every kind of style.
          </h1>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-white/10 px-4 py-2.5 font-sans text-xs tracking-wider text-white/60 hover:text-white hover:border-white/30 transition-colors"
            >
              <SlidersHorizontal size={14} />
              FILTER
            </button>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                size={14}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="bg-white/5 border border-white/10 text-white placeholder-white/30 pl-9 pr-4 py-2.5 font-sans text-sm focus:outline-none focus:border-white/30 w-[200px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs text-white/40 tracking-wider">
              SORT
            </span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="bg-white/5 border border-white/10 text-white font-sans text-xs tracking-wider px-4 py-2.5 appearance-none focus:outline-none focus:border-white/30 pr-8 cursor-pointer"
              >
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Active filter */}
        {categoryFilter && (
          <div className="mb-6 flex items-center gap-2">
            <span className="font-sans text-xs text-white/60">
              Category: {categoryFilter}
            </span>
            <button
              onClick={() => setSearchParams({})}
              className="text-white/40 hover:text-white font-sans text-xs underline"
            >
              Clear
            </button>
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <ProductsSkeleton count={8} />
        ) : (
          <ProductGrid products={filtered} />
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-white mb-4">
              NO PRODUCTS FOUND.
            </p>
            <p className="font-sans text-white/40 mb-6">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        <p className="font-sans text-xs text-white/30 mt-8">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p) => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
