import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products, getFeaturedProducts } from "../data/products";
import { EditorialBanner } from "../components/EditorialBanner";
import { CategorySection } from "../components/BestSellers";
import { TikTokSection } from "../components/TikTokSection";
import { Newsletter } from "../components/Newsletter";
import { ProductImagePlaceholder } from "../components/ProductImagePlaceholder";
import { ProductCard } from "../components/ProductCard";
import { HeroCarousel } from "../components/HeroCarousel";

export function Home() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <div>
      {/* Hero Carousel - Full Screen */}
      <HeroCarousel />

      {/* Brand Story */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-6">
                THE BRAND
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-6">
                Elixirr Essence
              </h2>
              <p className="font-sans text-white/50 leading-relaxed mb-6">
                Elixirr Essence is a fashion accessories brand focused on
                statement pieces that allow individual style to speak for
                itself. Every piece is designed with intention - to
                elevate, to command, to complete.
              </p>
              <p className="font-sans text-white/50 leading-relaxed mb-8">
                Built for the bold. Worn by the individual.
              </p>
              <Link
                to="/about"
                className="inline-block border border-white/30 text-white px-8 py-3.5 font-sans text-xs tracking-[0.15em] hover:border-white hover:bg-white/5 transition-colors"
              >
                READ OUR STORY
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="aspect-[4/5] lg:aspect-square"
            >
              <ProductImagePlaceholder
                label="Elixirr Essence"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
                SHOP OUR FAVOURITES
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-white">
                Featured Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
            >
              VIEW ALL
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center md:hidden">
            <Link
              to="/shop"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
            >
              VIEW ALL
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <EditorialBanner />

      {/* Category Section */}
      <CategorySection />

      {/* Best Sellers */}
      <BestSellersSection />

      {/* TikTok */}
      <TikTokSection />

      {/* Brand Philosophy */}
      <section className="py-20 md:py-32 bg-[#111111]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-6">
                STATEMENT FASHION
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-6">
                Every piece has a purpose.
              </h2>
              <p className="font-sans text-white/50 leading-relaxed max-w-xl">
                From cross pendants to chain bracelets, each item in the
                Elixirr Essence collection is a statement in its own right.
                Designed for those who use accessories as a language - bold,
                intentional, and unmistakably personal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-6">
                <div className="border border-white/10 p-6">
                  <h4 className="font-sans text-sm text-white mb-2">
                    Statement Fashion
                  </h4>
                  <p className="font-sans text-sm text-white/50">
                    Accessories that command attention.
                  </p>
                </div>
                <div className="border border-white/10 p-6">
                  <h4 className="font-sans text-sm text-white mb-2">
                    Our Community
                  </h4>
                  <p className="font-sans text-sm text-white/50">
                    Bold individuals who use fashion to speak their truth.
                  </p>
                </div>
                <div className="border border-white/10 p-6">
                  <h4 className="font-sans text-sm text-white mb-2">
                    The Brand
                  </h4>
                  <p className="font-sans text-sm text-white/50">
                    Premium quality. Black and white identity.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}

function BestSellersSection() {
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 8);

  return (
    <section className="py-20 md:py-32 bg-[#111111]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-12 md:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
            THE ONES EVERYONE WANTS
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-white">
            Best Sellers
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:gap-x-4 md:gap-y-10 snap-x snap-mandatory">
          {bestSellers.map((product) => (
            <div key={product.id} className="snap-start flex-shrink-0 w-[200px] md:w-auto md:flex-none">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
