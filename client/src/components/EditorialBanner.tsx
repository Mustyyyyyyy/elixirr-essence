import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function EditorialBanner() {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-6">
              NEW COLLECTION
            </p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
              WEAR YOUR ATTITUDE.
            </h2>
            <p className="font-sans text-white/50 text-base md:text-lg mb-10 max-w-md leading-relaxed">
              Accessories designed to turn everyday outfits into statements.
            </p>
            <Link
              to="/collections"
              className="inline-block bg-white text-black px-10 py-4 font-sans text-xs tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
            >
              EXPLORE THE COLLECTION
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
