import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import type React from "react";
import { products } from "../data/products";
import { socialLinks } from "../data/social";

const footerNav = [
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "Lookbook", href: "/lookbook" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

const customerNav = [
  { name: "Shipping", href: "/faq" },
  { name: "Returns", href: "/faq" },
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const subscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      setError("Please enter a valid email.");
      return;
    }
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#111111] pt-20 md:pt-28 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-3xl text-white font-bold tracking-tight">
                EE
              </span>
            </Link>
            <h3 className="font-sans text-sm text-white tracking-wider mb-1">
              ELIXIRR ESSENCE
            </h3>
            <p className="font-sans text-xs text-white/40 tracking-wider mb-6">
              STATEMENT FASHION ACCESSORIES
            </p>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-sans text-sm"
            >
              <MessageCircle size={14} />
              08100181602
            </a>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 font-sans mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              {footerNav.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 font-sans mb-6">
              Customer
            </p>
            <ul className="space-y-3">
              {customerNav.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-white/30 font-sans mb-6">
              Stay in the loop
            </p>
            <p className="font-sans text-sm text-white/50 mb-4 leading-relaxed">
              Get updates on new drops, restocks and exclusive releases.
            </p>
            {subscribed ? <p className="text-sm text-amber-200">You are on the list.</p> : <form onSubmit={subscribe} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
              />
              <button
                type="submit"
                className="bg-white text-black px-4 font-sans text-xs font-medium tracking-wider hover:bg-white/90 transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>}
            {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="font-sans text-xs text-white/30">
            &copy; 2026 Elixirr Essence. All rights reserved.
          </p>
          <div className="flex gap-6">
            {Object.entries(socialLinks).map(
              ([name, url]) =>
                url && (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors uppercase tracking-wider"
                  >
                    {name}
                  </a>
                )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
