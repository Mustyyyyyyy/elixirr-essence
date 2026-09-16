import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

export function ProductSkeletonCard() {
  return (
    <div>
      <div className="aspect-[3/4] bg-[#1a1a1a] mb-4 animate-pulse" />
      <div className="h-4 bg-[#1a1a1a] w-2/3 mb-2 animate-pulse" />
      <div className="h-4 bg-[#1a1a1a] w-1/3 animate-pulse" />
    </div>
  );
}

export function ProductsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeletonCard key={i} />
      ))}
    </div>
  );
}

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="py-20 md:py-24 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-10">
          YOU MAY ALSO LIKE
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
