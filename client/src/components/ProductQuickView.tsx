import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Product } from "../types/product";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductQuickView({
  product,
  onClose,
  onAddToCart,
}: ProductQuickViewProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#050505] z-50 overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white z-10 p-2"
              aria-label="Close quick view"
            >
              <X size={24} />
            </button>
            <div className="p-6 md:p-10">
              <div className="aspect-square mb-8">
                <ProductImagePlaceholder
                  label={product.name}
                  className="rounded"
                />
              </div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 font-sans mb-2">
                {product.category}
              </p>
              <h2 className="font-serif text-3xl text-white mb-4">
                {product.name}
              </h2>
              <p className="text-xl text-white/80 font-sans mb-4">
                ₦{product.price.toLocaleString()}
              </p>
              <p className="text-white/50 font-sans text-sm leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex items-center gap-3 mb-8">
                <span
                  className={`text-xs tracking-wider uppercase font-sans px-3 py-1.5 ${
                    product.stock > 0
                      ? "bg-white/10 text-white/70"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={product.stock <= 0}
                className="w-full bg-white text-black py-4 font-sans text-sm font-medium tracking-wide hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
