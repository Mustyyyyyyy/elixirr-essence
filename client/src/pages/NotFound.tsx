import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-8xl md:text-[12rem] text-white/10 leading-none mb-4"
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-2xl md:text-3xl text-white mb-8"
        >
          THIS PIECE DOESN'T EXIST.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/"
            className="inline-block bg-white text-black px-8 py-3.5 font-sans text-xs tracking-[0.15em] font-medium hover:bg-white/90 transition-colors"
          >
            RETURN HOME
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
