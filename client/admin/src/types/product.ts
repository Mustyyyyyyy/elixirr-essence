export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  _id?: string;
  id?: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  shippingMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  trackingNumber: string;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  avatar: string;
  isActive: boolean;
}