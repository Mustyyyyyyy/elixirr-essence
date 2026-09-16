import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";
import { useCartContext } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCartContext();

  const labels = [];
  if (product.newArrival) labels.push("NEW");
  if (product.bestSeller) labels.push("BEST SELLER");
  if (product.limited) labels.push("LIMITED");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#111111] mb-4">
          <ProductImagePlaceholder
            label={product.name}
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {labels.map((label) => (
              <span
                key={label}
                className="bg-white text-black text-[10px] tracking-wider font-sans font-medium px-2 py-1"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onQuickView) onQuickView(product);
              }}
              className="flex-1 bg-white text-black py-3 flex items-center justify-center gap-2 text-xs font-sans font-medium tracking-wide hover:bg-white/90 transition-colors"
              aria-label="Quick view"
            >
              <Eye size={14} />
              QUICK VIEW
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: "",
                  category: product.category,
                  slug: product.slug,
                });
              }}
              className="flex-1 bg-black text-white border border-white/20 py-3 flex items-center justify-center gap-2 text-xs font-sans font-medium tracking-wide hover:bg-white/10 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={14} />
              ADD
            </button>
          </div>
        </div>
      </Link>
      <Link to={`/product/${product.slug}`}>
        <h3 className="font-sans text-sm text-white group-hover:text-white/70 transition-colors">
          {product.name}
        </h3>
      </Link>
      <div className="flex items-center justify-between mt-1">
        <p className="font-sans text-sm text-white/60">
          ₦{product.price.toLocaleString()}
        </p>
        <p className="font-sans text-xs text-white/30">{product.category}</p>
      </div>
    </motion.div>
  );
}
