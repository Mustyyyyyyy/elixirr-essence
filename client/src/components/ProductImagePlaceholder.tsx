import { motion } from "framer-motion";

interface ProductImagePlaceholderProps {
  label: string;
  className?: string;
  showLabel?: boolean;
}

export function ProductImagePlaceholder({
  label,
  className = "",
  showLabel = true,
}: ProductImagePlaceholderProps) {
  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#050505] flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-white/40 text-lg tracking-wide text-center px-4 select-none"
        >
          {label}
        </motion.span>
      )}
      <div className="absolute bottom-2 right-2 text-[10px] text-white/20 uppercase tracking-widest font-sans">
        Elixirr Essence
      </div>
    </div>
  );
}
