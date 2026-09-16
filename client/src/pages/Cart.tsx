import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ShoppingBag } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import { products } from "../data/products";
import { ProductImagePlaceholder } from "../components/ProductImagePlaceholder";

function generateWhatsAppMessage(items: { productId: string }[]) {
  const names = items
    .map((i) => products.find((p) => p.id === i.productId)?.name)
    .filter(Boolean);
  if (names.length === 0) return "Hello Elixirr Essence, I would like to make an enquiry.";
  return names.map((n) => `I'm interested in the ${n}.`).join(" ");
}

const whatsappOrderUrl = `https://wa.me/2348100181602?text=${encodeURIComponent("Hello Elixirr Essence, I would like to place an order.")}`;

export function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCartContext();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const whatsappUrl = items.length
    ? generateWhatsAppMessage(items)
    : "Hello Elixirr Essence, I would like to make an enquiry.";

  const handleCheckout = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      clearCart();
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
            YOUR BAG
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white">
            {totalItems > 0 ? "Your Bag" : "YOUR BAG IS EMPTY."}
          </h1>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="font-sans text-white/40 mb-8">
              There are no items in your bag right now.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-black px-8 py-3.5 font-sans text-xs tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
            >
              EXPLORE THE COLLECTION
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 md:gap-6 p-4 border border-white/10"
                >
                  <div className="w-20 h-24 md:w-24 md:h-28 flex-shrink-0">
                    <ProductImagePlaceholder
                      label={item.name}
                      showLabel={false}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-sm text-white mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="font-sans text-sm text-white/40 mb-3">
                      {item.category}
                    </p>
                    <p className="font-sans text-sm text-white mb-3">
                      ₦{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-sans text-sm text-white w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-sans text-sm text-white">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="flex items-center gap-1 text-white/30 hover:text-red-400 transition-colors font-sans text-xs mt-2"
                    >
                      <ShoppingBag size={12} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors tracking-wider"
              >
                CLEAR BAG
              </button>
            </div>

            {/* Order Summary */}
            <div>
              <div className="border border-white/10 p-6 sticky top-28">
                <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-white mb-6">
                  ORDER SUMMARY
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span className="text-white">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-white/50">Items</span>
                    <span className="text-white">{totalItems}</span>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-sans text-base text-white">
                      Total
                    </span>
                    <span className="font-sans text-xl text-white">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={() => {}}
                  className="block w-full bg-white text-black text-center py-4 font-sans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors mb-3"
                >
                  CHECKOUT
                </Link>

                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-[#25D366] text-[#25D366] text-center py-4 font-sans text-sm tracking-wider hover:bg-[#25D366]/10 transition-colors mb-3"
                >
                  ORDER VIA WHATSAPP
                </a>

                <Link
                  to="/shop"
                  className="block text-center font-sans text-xs tracking-wider text-white/40 hover:text-white transition-colors mt-4"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-8 py-4 font-sans text-sm font-medium flex items-center gap-2 z-[80] shadow-xl"
            >
              <Check size={18} />
              ORDER PLACED VIA WHATSAPP
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
