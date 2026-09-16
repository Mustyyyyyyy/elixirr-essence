import { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

interface SearchOverlayProps {
  onClose: () => void;
}

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.includes(query.toLowerCase()))
      )
    : [];

  const handleResultClick = (slug: string) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-[#050505]"
    >
      <div className="p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto pt-20">
        <div className="flex items-center justify-between mb-8">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/40">
            Search
          </span>
          <button onClick={onClose} className="text-white/60 hover:text-white" aria-label="Close search">
            <X size={24} />
          </button>
        </div>

        <div className="relative">
          <Search
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30"
            size={20}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            className="w-full bg-transparent border-b border-white/20 text-white text-2xl md:text-3xl font-serif py-4 pl-10 focus:outline-none focus:border-white/50 placeholder-white/20"
          />
        </div>

        {query && (
          <div className="mt-8">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleResultClick(product.slug)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                  >
                    <div className="w-16 h-16 flex-shrink-0">
                      <ProductImagePlaceholder
                        label={product.name}
                        showLabel={false}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-sans text-white text-sm">
                        {product.name}
                      </p>
                      <p className="font-sans text-white/40 text-xs mt-1">
                        {product.category}
                      </p>
                    </div>
                    <span className="font-sans text-white/60 text-sm">
                      ₦{product.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-white/40 font-sans py-8 text-center">
                No products found for "{query}"
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
