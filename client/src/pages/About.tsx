import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Hero */}
        <div className="mb-16 md:mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-6">
            ABOUT
          </p>
          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl text-white leading-[0.95]">
            THE ESSENCE
          </h1>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="aspect-[21/9] mb-20 md:mb-28 overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#050505] flex items-center justify-center">
            <div className="text-center">
              <span className="font-serif text-6xl md:text-9xl text-white/10">EE</span>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
          </div>
        </motion.div>

        {/* Our Story */}
        <div className="mb-20 md:mb-32">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-6">
            OUR STORY
          </p>
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="font-sans text-white/70 leading-relaxed mb-6 text-lg md:text-xl"
            >
              Elixirr Essence is a fashion accessories brand focused on
              statement pieces that allow individual style to speak for itself.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-sans text-white/50 leading-relaxed"
            >
              Every piece is designed with the belief that accessories are
              not afterthoughts - they are the foundation of personal
              expression.
            </motion.p>
          </div>
        </div>

        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Our Philosophy
            </h2>
            <p className="font-sans text-white/50 leading-relaxed">
              We believe that true style is about confidence, not conformity.
              Each piece is designed to help you stand out, not blend in.
              Quality over quantity. Presence over noise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Statement Fashion
            </h2>
            <p className="font-sans text-white/50 leading-relaxed">
              Accessories should be noticed. They should complete an outfit,
              set a tone, and tell the world who you are before you even
              speak.
            </p>
          </motion.div>
        </div>

        {/* Community */}
        <div className="mb-20 md:mb-32">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-6">
            OUR COMMUNITY
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Bold", "Intentional", "Individual", "Fearless"].map(
              (word, i) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-white/10 p-8 md:p-10 text-center"
                >
                  <span className="font-serif text-2xl md:text-3xl text-white">
                    {word}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* The Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
              The Brand
            </h2>
            <p className="font-sans text-white/50 leading-relaxed mb-8">
              Rooted in black and white aesthetics. Driven by street energy.
              Committed to premium quality. Elixirr Essence is more than a
              brand - it is a statement of intent.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-black px-8 py-3.5 font-sans text-xs tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
            >
              SHOP THE COLLECTION
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="aspect-square relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#050505] flex items-center justify-center">
              <span className="font-serif text-8xl md:text-9xl text-white/10">
                EE
              </span>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
          </motion.div>
        </div>

        {/* Contact CTA */}
        <div className="text-center py-16 border-t border-white/10">
          <p className="font-sans text-white/40 mb-6">
            Questions? Reach out through WhatsApp or our contact page.
          </p>
          <a
            href="https://wa.me/2348100181602"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-8 py-3.5 font-sans text-xs tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
          >
            CHAT ON WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
}
