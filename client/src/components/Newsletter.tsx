import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface NewsletterProps {
  onSubmit?: (email: string) => void;
}

export function Newsletter({ onSubmit }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (onSubmit) onSubmit(email);
      const response = await fetch(`${API_BASE_URL}/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Unable to subscribe right now.");
      setSubmitted(true);
      setEmail("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to subscribe right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#111111] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-white/50 font-sans mb-4"
          >
            STAY IN THE LOOP.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl text-white mb-4 leading-tight"
          >
            Get updates on new drops, restocks and exclusive releases.
          </motion.h2>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/70 font-sans mt-6"
            >
              Thank you for subscribing.
            </motion.p>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-sm bg-white/5 border border-white/10 text-white placeholder-white/30 px-5 py-3 font-sans text-sm focus:outline-none focus:border-amber-200/60 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-black px-8 py-3 font-sans text-sm font-medium tracking-wide hover:bg-amber-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? "JOINING..." : "SUBSCRIBE"}
                <ArrowRight size={16} />
              </button>
            </motion.form>
          )}
          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        </div>
      </div>
    </section>
  );
}
