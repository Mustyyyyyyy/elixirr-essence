export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  limited: boolean;
  stock: number;
  materials: string;
  sizes: string[];
  careInstructions: string[];
  tags: string[];
}
