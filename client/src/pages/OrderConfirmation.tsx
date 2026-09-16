import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";

export function OrderConfirmation() {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-8"
          >
            <CheckCircle size={32} className="text-white" />
          </motion.div>

          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
            ORDER CONFIRMED
          </h1>
          <p className="font-sans text-white/50 mb-10 text-lg">
            Thank you for shopping with Elixirr Essence. Your order details
            have been sent to your WhatsApp.
          </p>

          <div className="border border-white/10 p-6 mb-10 text-left">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-sans text-xs text-white/30 uppercase tracking-wider mb-1">Order Number</p>
                <p className="font-sans text-white">EE{Math.floor(Math.random() * 900000 + 100000)}</p>
              </div>
              <div>
                <p className="font-sans text-xs text-white/30 uppercase tracking-wider mb-1">Status</p>
                <p className="font-sans text-[#25D366]">Sent via WhatsApp</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="inline-block bg-white text-black px-8 py-3.5 font-sans text-xs tracking-wider font-medium hover:bg-white/90 transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
            <a
              href="https://wa.me/2348100181602"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 font-sans text-xs tracking-wider hover:border-white transition-colors"
            >
              <ShoppingBag size={14} />
              CONTACT US
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
