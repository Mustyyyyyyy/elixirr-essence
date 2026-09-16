import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";
import { CategoryCard } from "./CategoryCard";

const categories = [
  { name: "NECKLACES", href: "/shop?category=Necklaces" },
  { name: "RINGS", href: "/shop?category=Rings" },
  { name: "BRACELETS", href: "/shop?category=Bracelets" },
  { name: "ACCESSORIES", href: "/shop?category=Accessories" },
];

export function BestSellers() {
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <section className="py-20 md:py-32 bg-[#111111]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-12 md:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
            THE ONES EVERYONE WANTS
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-white">
            Best Sellers
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:gap-x-4 md:gap-y-10 snap-x snap-mandatory">
          {bestSellers.map((product) => (
            <div key={product.id} className="snap-start flex-shrink-0 w-[200px] md:w-auto md:flex-none">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategorySection() {
  return (
    <section className="py-20 md:py-32 bg-[#050505]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-12 md:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
            SHOP BY CATEGORY
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-white">
            Explore
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              image=""
              href={cat.href}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
