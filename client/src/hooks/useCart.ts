import { useCartContext } from "../context/CartContext";
import type { CartItem } from "../types/cart";

export function useCart() {
  const {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  } = useCartContext();
  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  };
}
