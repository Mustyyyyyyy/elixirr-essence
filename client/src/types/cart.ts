export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  slug: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
