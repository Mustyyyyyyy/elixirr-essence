import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="py-20 md:py-32 bg-[#050505]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
              SHOP OUR FAVOURITES
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-white">
              Featured Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
          >
            VIEW ALL
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Link
            to="/shop"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
          >
            VIEW ALL
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
