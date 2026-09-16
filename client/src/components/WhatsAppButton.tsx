import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { socialLinks } from "../data/social";

export function WhatsAppButton() {
  return (
    <motion.a
      href={socialLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow font-sans text-sm font-medium tracking-wide"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">CHAT WITH US</span>
    </motion.a>
  );
}
