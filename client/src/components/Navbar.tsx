import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/shop" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "LOOKBOOK", href: "/lookbook" },
  { name: "ABOUT", href: "/about" },
];

export function Navbar() {
  const { totalItems } = useCartContext();
  const scrolled = useScrollPosition(50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setCartOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex-shrink-0" aria-label="Home">
              <span className="font-serif text-xl md:text-2xl text-white font-bold tracking-tight">
                EE
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-white/70 font-sans text-xs tracking-[0.15em] hover:text-white transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-5">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="text-white/70 hover:text-white transition-colors p-1 relative"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-white text-black text-[10px] font-sans font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link
                to="/shop"
                className="hidden md:inline-block bg-white text-black px-5 py-2 font-sans text-xs tracking-wider font-medium hover:bg-white/90 transition-colors"
              >
                SHOP NOW
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-white/70 hover:text-white transition-colors p-1"
                aria-label="Menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay onClose={() => setSearchOpen(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
