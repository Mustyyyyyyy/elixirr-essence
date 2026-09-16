import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard, Smartphone } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import { ProductImagePlaceholder } from "../components/ProductImagePlaceholder";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCartContext();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen pt-24 md:pt-28 pb-20 px-4 text-center">
        <h1 className="font-serif text-4xl text-white mb-6">
          YOUR BAG IS EMPTY.
        </h1>
        <Link
          to="/shop"
          className="inline-block bg-white text-black px-8 py-3 font-sans text-sm tracking-wider hover:bg-white/90 transition-colors"
        >
          EXPLORE THE COLLECTION
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          customerCity: formData.city,
          customerPostalCode: formData.postalCode,
          customerCountry: formData.country,
          items,
          shippingMethod: "standard",
          subtotal: totalPrice,
          shipping: 0,
          total: totalPrice,
          paymentMethod: "whatsapp",
        }),
      });
      if (!response.ok) throw new Error("Unable to place your order. Please try again.");
      clearCart();
      setOrderPlaced(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to place your order.");
    } finally {
      setSubmitting(false);
    }
  };

  const orderNumber = useMemo(
    () => "EE" + Math.floor(Math.random() * 900000 + 100000),
    []
  );

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-24 md:pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
              ORDER CONFIRMED
            </h1>
            <p className="font-sans text-white/50 mb-8">
              Thank you for shopping with Elixirr Essence. Your order
              will be processed via WhatsApp.
            </p>
            <p className="font-sans text-sm text-white/40 mb-8">
              Order Number: {orderNumber}
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-black px-8 py-3.5 font-sans text-xs tracking-wider font-medium hover:bg-white/90 transition-colors mr-4"
            >
              CONTINUE SHOPPING
            </Link>
            <a
              href="https://wa.me/2348100181602"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 font-sans text-xs tracking-wider hover:border-white transition-colors"
            >
              CONTACT US
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-12">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
          >
            <ChevronLeft size={16} />
            BACK TO BAG
          </Link>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl text-white mb-12">
          CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Customer Details */}
          <div>
            <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-white mb-6">
              Customer Details
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                />
              </div>

              <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-white mt-8 mb-6">
                Delivery Details
              </h2>
              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                  Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>
              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                />
              </div>
            </form>

            {/* Payment */}
            <div className="mt-10">
              <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-white mb-6">
                Payment
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-white/10 cursor-pointer hover:border-white/30 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="accent-white"
                  />
                  <div>
                    <p className="font-sans text-sm text-white">
                      Order via WhatsApp
                    </p>
                    <p className="font-sans text-xs text-white/40">
                      We will send your order details via WhatsApp
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border border-white/10 cursor-pointer hover:border-white/30 transition-colors opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    disabled
                    className="accent-white"
                  />
                  <div>
                    <p className="font-sans text-sm text-white">
                      Paystack
                    </p>
                    <p className="font-sans text-xs text-white/40">
                      Coming soon
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border border-white/10 cursor-pointer hover:border-white/30 transition-colors opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    disabled
                    className="accent-white"
                  />
                  <div>
                    <p className="font-sans text-sm text-white">
                      Flutterwave
                    </p>
                    <p className="font-sans text-xs text-white/40">
                      Coming soon
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border border-white/10 p-6 sticky top-28">
              <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-white mb-6">
                ORDER SUMMARY
              </h3>

              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-12 h-14 flex-shrink-0">
                      <ProductImagePlaceholder
                        label={item.name}
                        showLabel={false}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-xs text-white truncate">
                        {item.name}
                      </p>
                      <p className="font-sans text-xs text-white/40">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-sans text-xs text-white">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-white/50">Items</span>
                  <span className="text-white">{totalItems}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-sans text-base text-white">
                    Total
                  </span>
                  <span className="font-sans text-2xl text-white">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                className="w-full bg-white text-black py-4 font-sans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "PLACING ORDER..." : "PLACE ORDER VIA WHATSAPP"}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-white/30">
                <Smartphone size={14} />
                <span className="font-sans text-xs">
                  Order will be sent to WhatsApp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
