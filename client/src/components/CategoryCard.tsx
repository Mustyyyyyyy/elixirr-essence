import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string;
  description?: string;
  href: string;
  index: number;
}

export function CategoryCard({
  name,
  image,
  href,
  index,
}: CategoryCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative block aspect-[4/5] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505] transition-transform duration-700 group-hover:scale-105">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-white/60 group-hover:text-white transition-colors duration-500 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          <span className="text-xs font-sans tracking-wider uppercase">
            Explore
          </span>
          <ArrowUpRight
            size={16}
            className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          />
        </div>
      </div>
    </motion.a>
  );
}
