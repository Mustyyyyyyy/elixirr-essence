import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";

export function TikTokSection() {
  const items = [
    { id: "1", platform: "tiktok" as const, caption: "New drop is here. Check the link in bio.", url: "https://www.tiktok.com/@elixirr_essence" },
    { id: "2", platform: "tiktok" as const, caption: "How the Chrome Cross is styled by our community.", url: "https://www.tiktok.com/@elixirr_essence" },
    { id: "3", platform: "instagram" as const, caption: "Statement piece alert.", url: "https://www.instagram.com/elixirressence" },
    { id: "4", platform: "instagram" as const, caption: "Back in stock. The ones everyone wanted.", url: "https://www.instagram.com/elixirressence" },
    { id: "5", platform: "tiktok" as const, caption: "Everyday stack with the Signet set.", url: "https://www.tiktok.com/@elixirr_essence" },
    { id: "6", platform: "instagram" as const, caption: "Limited edition halo pendant.", url: "https://www.instagram.com/elixirressence" },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#111111]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
              AS SEEN ON TIKTOK
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-white">
              The Brand on TikTok
            </h2>
          </div>
          <a
            href="https://www.tiktok.com/@elixirr_essence"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
          >
            <span className="font-sans text-sm">@elixirr_essence</span>
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {items.map((item) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative aspect-square overflow-hidden bg-[#1a1a1a]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 text-black px-4 py-2 font-sans text-xs tracking-wider">
                  VIEW ON TIKTOK
                </div>
              </div>
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                <span className="text-white font-sans text-xs">@elixirr_essence</span>
              </div>
              {item.caption && (
                <p className="absolute bottom-3 right-3 z-10 text-white/70 font-sans text-xs max-w-[180px] text-right line-clamp-2">
                  {item.caption}
                </p>
              )}
            </motion.a>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <a
            href="https://www.tiktok.com/@elixirr_essence"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-sans text-xs tracking-wider"
          >
            <span>@elixirr_essence</span>
          </a>
        </div>
      </div>
    </section>
  );
}
