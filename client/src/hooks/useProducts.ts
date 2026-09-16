import { useState, useEffect } from "react";
import type { Product } from "../types/product";
import { products as staticProducts } from "../data/products";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

function normalizeProduct(product: Record<string, any>): Product {
  return {
    id: String(product.id ?? product._id),
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    category: product.category,
    description: product.description,
    shortDescription: product.shortDescription ?? product.short_description ?? "",
    images: (product.images ?? []).map((image: { url: string; id?: string; alt?: string }, index: number) => ({
      id: image.id ?? `${product.id ?? product._id}-${index}`,
      url: image.url.startsWith("http") ? image.url : `${API_ORIGIN}${image.url}`,
      alt: image.alt ?? product.name,
    })),
    featured: Boolean(product.featured),
    bestSeller: Boolean(product.bestSeller ?? product.best_seller),
    newArrival: Boolean(product.newArrival ?? product.new_arrival),
    limited: Boolean(product.limited),
    stock: Number(product.stock ?? 0),
    materials: product.materials ?? "",
    sizes: product.sizes ?? [],
    careInstructions: product.careInstructions ?? product.care_instructions ?? [],
    tags: product.tags ?? [],
  };
}

export function useProducts() {
  const [productList, setProductList] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductsFromAPI();
  }, []);

  const fetchProductsFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products?limit=100`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      if (data.products && data.products.length > 0) {
        setProductList(data.products.map(normalizeProduct));
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching products from API:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { products: productList, loading, error };
}

export function useProductBySlug(slug: string) {
  const { products } = useProducts();
  const product = products.find((p: Product) => p.slug === slug);
  return { product, loading: false };
}