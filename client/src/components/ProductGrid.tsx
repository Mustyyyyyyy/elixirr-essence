import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types/product";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-sans text-white/40">No products found.</p>
        <Link
          to="/shop"
          className="inline-block mt-4 text-white/60 hover:text-white font-sans text-sm tracking-wider"
        >
          BACK TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className={`grid ${colClass[columns]} gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
