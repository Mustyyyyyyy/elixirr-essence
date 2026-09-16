import { Link } from "react-router-dom";
import { X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "../data/social";

interface MobileMenuProps {
  onClose: () => void;
}

const menuLinks = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/shop" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "LOOKBOOK", href: "/lookbook" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-[#050505]"
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-12">
          <span className="font-serif text-2xl text-white font-bold">EE</span>
          <button
            onClick={onClose}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {menuLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.1 }}
            >
              <Link
                to={link.href}
                onClick={onClose}
                className="font-serif text-4xl md:text-5xl text-white hover:text-white/60 transition-colors py-3 border-b border-white/5 block"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <p className="text-xs tracking-[0.2em] uppercase text-white/40 font-sans mb-4">
            Follow us
          </p>
          <div className="flex gap-4">
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
            >
              TikTok
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
            >
              Instagram
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
            >
              <MessageCircle size={12} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
