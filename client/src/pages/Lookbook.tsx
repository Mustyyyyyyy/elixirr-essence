import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Lookbook() {
  const looks = [
    {
      id: "1",
      label: "THE CROSS EDIT",
      aspect: "aspect-[3/4]",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: "2",
      label: "NIGHT COLLECTION",
      aspect: "aspect-[3/4]",
      span: "",
    },
    {
      id: "3",
      label: "",
      aspect: "aspect-square",
      span: "",
    },
    {
      id: "4",
      label: "STATEMENT PIECES",
      aspect: "aspect-[3/4]",
      span: "md:col-span-2",
    },
    {
      id: "5",
      label: "",
      aspect: "aspect-[4/5]",
      span: "",
    },
    {
      id: "6",
      label: "EVERYDAY DETAILS",
      aspect: "aspect-square",
      span: "",
    },
    {
      id: "7",
      label: "",
      aspect: "aspect-[3/4]",
      span: "",
    },
    {
      id: "8",
      label: "",
      aspect: "aspect-[4/5]",
      span: "",
    },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-4">
            LOOKBOOK
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
            Style Stories
          </h1>
          <p className="font-sans text-white/50 max-w-lg">
            See how our community styles Elixirr Essence. Each look tells a
            story.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {looks.map((look, i) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden ${look.span} ${look.aspect} bg-[#1a1a1a]`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#050505] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

              {look.label && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-white text-black px-6 py-2 font-sans text-xs tracking-wider font-medium">
                    {look.label}
                  </span>
                </div>
              )}

              {/* Placeholder label for image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-serif text-white/20 text-2xl md:text-4xl">
                  {look.label || `LOOK ${i + 1}`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-sans text-white/30 text-sm mb-6">
            Image placeholders - replace with actual editorial photography
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-white/20 text-white/60 hover:text-white hover:border-white/40 px-8 py-3 font-sans text-xs tracking-wider transition-colors"
          >
            SHOP THE LOOK
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
