import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";
import { useAutoPlay } from "../hooks/useAutoPlay";
import { useSwipe } from "../hooks/useSwipe";

const slides = [
  {
    productId: "1",
    heading: "MAKE A STATEMENT.",
    subtext: "Statement accessories for people who don't blend in.",
    cta: "SHOP THE COLLECTION",
    ctaLink: "/shop",
  },
  {
    productId: "2",
    heading: "BUILT TO BE NOTICED.",
    subtext: "Accessories that complete the look.",
    cta: "SHOP RINGS",
    ctaLink: "/shop?category=Rings",
  },
  {
    productId: "3",
    heading: "DETAILS MATTER.",
    subtext: "Small details. Strong presence.",
    cta: "SHOP BRACELETS",
    ctaLink: "/shop?category=Bracelets",
  },
  {
    productId: "1",
    heading: "WEAR YOUR ATTITUDE.",
    subtext: "Cross and pendant accessories with presence.",
    cta: "EXPLORE NECKLACES",
    ctaLink: "/shop?category=Necklaces",
  },
  {
    productId: "5",
    heading: "YOUR STYLE.",
    subtext: "YOUR STATEMENT.",
    cta: "VIEW COLLECTIONS",
    ctaLink: "/collections",
  },
];

export function HeroCarousel() {
  const { current, goTo, next, prev, resetTimer } = useAutoPlay(
    slides.length,
    5000
  );

  const swipe = useSwipe(prev, next);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      // pause logic handled via resetting timer
    }
  }, [isPaused]);

  const currentProduct = products.find((p) => p.id === slides[current].productId);

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => {
        /* pause autoplay */
      }}
      onMouseLeave={() => {
        /* resume autoplay */
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Background image area */}
          <div className="absolute inset-0">
            <ProductImagePlaceholder
              label={slides[current].heading}
              className="w-full h-full"
              showLabel={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-6"
              >
                Elixirr Essence
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6"
              >
                {slides[current].heading}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-sans text-white/60 text-base md:text-lg mb-10 max-w-md"
              >
                {slides[current].subtext}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href={slides[current].ctaLink}
                  className="bg-white text-black px-8 py-3.5 font-sans text-xs tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
                >
                  {slides[current].cta}
                </a>
                <a
                  href="/about"
                  className="border border-white/30 text-white px-8 py-3.5 font-sans text-xs tracking-[0.15em] hover:border-white hover:bg-white/5 transition-colors"
                >
                  EXPLORE THE BRAND
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Progress bar */}
        <div className="h-[2px] bg-white/10">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={prev}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="font-sans text-xs text-white/40 tracking-wider">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-[2px] transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-4 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
