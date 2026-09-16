import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { collections } from "../data/collections";
import { ProductImagePlaceholder } from "../components/ProductImagePlaceholder";
import { getProductsByCategory } from "../data/products";
import type { Collection } from "../types/collection";

function CollectionBlock({
  collection,
  layout,
  index,
}: {
  collection: Collection;
  layout: "full" | "split" | "small";
  index: number;
}) {
  const productCount = collection.products.length;

  if (layout === "full") {
    return (
      <motion.a
        href={`/collections/${collection.slug}`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="group block relative aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-8 md:mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505] transition-transform duration-700 group-hover:scale-105">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-3">
            {productCount} PIECES
          </p>
          <h3 className="font-serif text-3xl md:text-5xl text-white mb-3">
            {collection.name}
          </h3>
          <p className="font-sans text-white/50 max-w-md mb-4 hidden md:block">
            {collection.description}
          </p>
          <div className="flex items-center gap-2 text-white font-sans text-xs tracking-wider">
            EXPLORE
            <ArrowRight
              size={14}
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </div>
        </div>
      </motion.a>
    );
  }

  if (layout === "split") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-12"
      >
        <div className="aspect-[4/5] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#050505] flex items-center justify-center">
            <ProductImagePlaceholder label={collection.name} showLabel={false} />
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-3">
            {productCount} PIECES
          </p>
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {collection.name}
          </h3>
          <p className="font-sans text-white/50 mb-6 leading-relaxed">
            {collection.description}
          </p>
          <Link
            to={`/collections/${collection.slug}`}
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 font-sans text-xs tracking-wider font-medium hover:bg-white/90 transition-colors"
          >
            EXPLORE
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={`/collections/${collection.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group block aspect-[3/4] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505] transition-transform duration-700 group-hover:scale-105">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="font-serif text-xl text-white mb-2">
          {collection.name}
        </h3>
        <p className="font-sans text-xs text-white/40">
          {productCount} pieces
        </p>
      </div>
    </motion.a>
  );
}

export function Collections() {
  const layoutMap: Record<string, "full" | "split" | "small"> = {
    "new-arrivals": "full",
    "statement-necklaces": "split",
    rings: "small",
    bracelets: "small",
    "best-sellers": "full",
    accessories: "split",
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
            COLLECTIONS
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white">
            Curated Collections
          </h1>
        </div>

        {collections.map((collection, i) => (
          <CollectionBlock
            key={collection.id}
            collection={collection}
            layout={layoutMap[collection.slug] || "small"}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
