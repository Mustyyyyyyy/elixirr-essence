import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, Heart } from "lucide-react";
import { products, getProductBySlug, getRelatedProducts } from "../data/products";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";
import { ProductCard } from "./ProductCard";
import { useCartContext } from "../context/CartContext";
import { socialLinks } from "../data/social";

export function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addToCart, isInCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const related = product ? getRelatedProducts(product.id, 4) : [];

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center">
        <h1 className="font-serif text-4xl text-white mb-6">
          WE COULDN'T FIND THAT PIECE.
        </h1>
        <Link
          to="/shop"
          className="inline-block bg-white text-black px-8 py-3 font-sans text-sm tracking-wider hover:bg-white/90 transition-colors"
        >
          BACK TO SHOP
        </Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: "",
      category: product.category,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = `Hello Elixirr Essence, I'm interested in the ${product.name}.`;
  const whatsappUrl = `${socialLinks.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Breadcrumb */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors font-sans text-xs tracking-wider mb-8"
        >
          <ArrowLeft size={12} />
          BACK TO SHOP
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] lg:aspect-square">
              <ProductImagePlaceholder
                label={product.name}
                className="w-full h-full"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border transition-colors ${
                    i === activeImage
                      ? "border-white"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <ProductImagePlaceholder
                    label={product.name}
                    showLabel={false}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-28 self-start">
            <p className="text-xs tracking-[0.2em] uppercase text-white/40 font-sans mb-3">
              {product.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-white font-sans mb-6">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="font-sans text-white/60 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span
                className={`text-xs tracking-wider uppercase font-sans px-3 py-1.5 ${
                  product.stock > 0
                    ? "bg-white/10 text-white/70"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
              {product.limited && (
                <span className="text-xs tracking-wider uppercase font-sans px-3 py-1.5 bg-white/10 text-white/50">
                  LIMITED
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center border border-white/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-white/50 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 font-sans text-white text-sm min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-3 text-white/50 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 bg-white text-black py-3 font-sans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {added ? "ADDED!" : "ADD TO CART"}
              </button>
              <button
                className="p-3 border border-white/10 text-white/50 hover:text-white transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] py-3 font-sans text-sm tracking-wider hover:bg-[#25D366]/10 transition-colors"
              >
                <MessageCircle size={16} />
                ORDER VIA WHATSAPP
              </a>
            </div>

            {/* Product details */}
            <div className="space-y-6 border-t border-white/10 pt-8">
              {product.materials && (
                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-2">
                    Materials
                  </h4>
                  <p className="font-sans text-sm text-white/70">
                    {product.materials}
                  </p>
                </div>
              )}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-2">
                    Available Sizes
                  </h4>
                  <p className="font-sans text-sm text-white/70">
                    {product.sizes.join(", ")}
                  </p>
                </div>
              )}
              {product.careInstructions && product.careInstructions.length > 0 && (
                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-2">
                    Care Instructions
                  </h4>
                  <ul className="space-y-1">
                    {product.careInstructions.map((ci, i) => (
                      <li key={i} className="font-sans text-sm text-white/70">
                        {ci}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-8">
            Product Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/10 p-6">
              <h4 className="font-sans text-sm text-white mb-2">Delivery Information</h4>
              <p className="font-sans text-sm text-white/50 leading-relaxed">
                Delivery available within Nigeria. Contact us via WhatsApp for delivery details and timelines.
              </p>
            </div>
            <div className="border border-white/10 p-6">
              <h4 className="font-sans text-sm text-white mb-2">Returns</h4>
              <p className="font-sans text-sm text-white/50 leading-relaxed">
                Contact us via WhatsApp for return and exchange inquiries.
              </p>
            </div>
            <div className="border border-white/10 p-6">
              <h4 className="font-sans text-sm text-white mb-2">Sizing</h4>
              <p className="font-sans text-sm text-white/50 leading-relaxed">
                Each product listing includes available sizes. Contact us for sizing guidance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 md:mt-32">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-10 px-4 sm:px-6 lg:px-10">
            YOU MAY ALSO LIKE
          </h2>
          <div className="px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
              {related.map((p) => (
                <div key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
