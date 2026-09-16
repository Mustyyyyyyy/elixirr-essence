import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { socialLinks } from "../data/social";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const whatsappUrl = `${socialLinks.whatsapp}?text=${encodeURIComponent("Hello Elixirr Essence, I would like to make an enquiry.")}`;

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-sans mb-6">
            CONTACT
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-8">
            CONTACT ELIXIRR ESSENCE
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8 mb-12">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 font-sans mb-2">
                  WhatsApp
                </p>
                <a
                  href={`${socialLinks.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-2xl md:text-3xl text-white hover:text-white/70 transition-colors"
                >
                  08100181602
                </a>
              </div>

              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 font-sans mb-2">
                  TikTok
                </p>
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xl text-white hover:text-white/70 transition-colors"
                >
                  @elixirr_essence
                </a>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-sans text-sm tracking-wider font-medium hover:bg-[#25D366]/90 transition-colors"
            >
              <MessageCircle size={18} />
              CHAT ON WHATSAPP
            </a>
            <p className="font-sans text-xs text-white/30 mt-2 ml-1">
              Message pre-filled
            </p>

            <div className="mt-12">
              <div className="aspect-video bg-[#111111] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#050505] flex items-center justify-center">
                  <span className="font-serif text-4xl md:text-6xl text-white/10">
                    EE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="border border-white/10 p-10 text-center">
                <h3 className="font-serif text-2xl text-white mb-3">
                  MESSAGE SENT
                </h3>
                <p className="font-sans text-white/50">
                  Thank you for reaching out. We will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-white/40 mb-2 block">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 font-sans text-sm focus:outline-none focus:border-white/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 font-sans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  SEND MESSAGE
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
