import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCartContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[55]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#050505] z-[60] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-white">
                Your Bag ({totalItems})
              </h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-serif text-2xl text-white mb-4">
                    YOUR BAG IS EMPTY.
                  </p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="bg-white text-black px-8 py-3 font-sans text-xs tracking-wider hover:bg-white/90 transition-colors"
                  >
                    EXPLORE THE COLLECTION
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-24 flex-shrink-0">
                        <ProductImagePlaceholder
                          label={item.name}
                          showLabel={false}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-sans text-sm text-white">
                          {item.name}
                        </h3>
                        <p className="font-sans text-sm text-white/50 mt-1">
                          ₦{item.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-sans text-sm text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="flex items-center gap-1 text-white/30 hover:text-red-400 transition-colors mt-2 font-sans text-xs"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-sm text-white/60">SUBTOTAL</span>
                  <span className="font-sans text-lg text-white">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full bg-white text-black text-center py-4 font-sans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors"
                >
                  CHECKOUT
                </Link>
                <button
                  onClick={onClose}
                  className="block w-full text-white/50 font-sans text-xs tracking-wider hover:text-white transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
