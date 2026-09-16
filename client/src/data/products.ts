import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Chrome Cross Necklace",
    slug: "chrome-cross-necklace",
    price: 15000,
    category: "Necklaces",
    description:
      "A bold chrome cross pendant on a refined chain. Crafted for those who wear their beliefs and attitude with confidence. The smooth chrome finish catches light with every movement.",
    shortDescription:
      "Bold chrome cross pendant. Premium chain. Statement piece.",
    images: [
      { id: "1a", url: "", alt: "Chrome Cross Necklace - front view" },
      { id: "1b", url: "", alt: "Chrome Cross Necklace - detail view" },
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    limited: false,
    stock: 12,
    materials: "Chrome-plated alloy, stainless steel chain",
    sizes: ["One Size"],
    careInstructions: [
      "Avoid direct contact with water and chemicals",
      "Store in a dry place when not in use",
      "Wipe with a soft cloth after wear",
    ],
    tags: ["cross", "pendant", "statement", "chrome"],
  },
  {
    id: "2",
    name: "Obsidian Ring",
    slug: "obsidian-ring",
    price: 8500,
    category: "Rings",
    description:
      "Dark obsidian stone set in a minimalist band. A ring that commands attention without saying a word. Perfect for those who prefer subtle power.",
    shortDescription: "Dark obsidian stone, minimalist band, quiet power.",
    images: [
      { id: "2a", url: "", alt: "Obsidian Ring - front view" },
      { id: "2b", url: "", alt: "Obsidian Ring - detail view" },
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    limited: false,
    stock: 8,
    materials: "Obsidian stone, brass band with silver plating",
    sizes: ["6", "7", "8", "9", "10"],
    careInstructions: [
      "Remove before swimming or bathing",
      "Store separately to avoid scratches",
      "Clean with dry soft cloth",
    ],
    tags: ["ring", "obsidian", "stone", "minimalist"],
  },
  {
    id: "3",
    name: "Iron Chain Bracelet",
    slug: "iron-chain-bracelet",
    price: 12000,
    category: "Bracelets",
    description:
      "Industrial-inspired iron chain bracelet with a weighted feel. Built for the streets, designed for the room. A rugged yet refined accessory.",
    shortDescription: "Industrial chain design. Weighted. Rugged and refined.",
    images: [
      { id: "3a", url: "", alt: "Iron Chain Bracelet - front view" },
      { id: "3b", url: "", alt: "Iron Chain Bracelet - detail view" },
    ],
    featured: true,
    bestSeller: false,
    newArrival: true,
    limited: false,
    stock: 15,
    materials: "Iron alloy, black oxide finish",
    sizes: ["S", "M", "L"],
    careInstructions: [
      "Keep dry to maintain finish",
      "Avoid prolonged sun exposure",
      "Store in provided pouch",
    ],
    tags: ["chain", "bracelet", "industrial", "streetwear"],
  },
  {
    id: "4",
    name: "Silver Signet Ring",
    slug: "silver-signet-ring",
    price: 11000,
    category: "Rings",
    description:
      "Classic signet design in polished silver. A timeless piece that bridges generations while commanding modern presence.",
    shortDescription: "Polished silver signet. Timeless. Bold.",
    images: [
      { id: "4a", url: "", alt: "Silver Signet Ring - front view" },
    ],
    featured: false,
    bestSeller: true,
    newArrival: false,
    limited: false,
    stock: 6,
    materials: " Sterling silver",
    sizes: ["6", "7", "8", "9", "10", "11"],
    careInstructions: [
      "Polish with silver cloth regularly",
      "Remove before sleeping",
      "Avoid contact with chlorine",
    ],
    tags: ["signet", "silver", "classic", "ring"],
  },
  {
    id: "5",
    name: "Halo Pendant Necklace",
    slug: "halo-pendant-necklace",
    price: 18000,
    category: "Necklaces",
    description:
      "Circular halo pendant with open centre design. Light catches the edges creating a radiant effect around the neck. An architectural piece.",
    shortDescription: "Architectural halo pendant. Open centre. Radiant.",
    images: [
      { id: "5a", url: "", alt: "Halo Pendant Necklace - front view" },
      { id: "5b", url: "", alt: "Halo Pendant Necklace - detail view" },
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    limited: true,
    stock: 4,
    materials: "Stainless steel, gold-tone plating",
    sizes: ["One Size"],
    careInstructions: [
      "Avoid moisture and perfumes",
      "Store in cloth bag",
      "Handle with care to preserve plating",
    ],
    tags: ["halo", "pendant", "architectural", "necklace"],
  },
  {
    id: "6",
    name: "Cuff Bracelet",
    slug: "cuff-bracelet",
    price: 13500,
    category: "Bracelets",
    description:
      "Wide cuff bracelet with geometric cuts. A statement piece for the wrist that works with both casual and elevated looks.",
    shortDescription: "Wide cuff. Geometric cuts. Statement wrist piece.",
    images: [
      { id: "6a", url: "", alt: "Cuff Bracelet - front view" },
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    limited: false,
    stock: 9,
    materials: "Aluminium alloy, matte black finish",
    sizes: ["S", "M", "L", "XL"],
    careInstructions: [
      "Wipe clean after use",
      "Avoid bending",
      "Store flat",
    ],
    tags: ["cuff", "bracelet", "geometric", "wide"],
  },
  {
    id: "7",
    name: "Anchor Link Necklace",
    slug: "anchor-link-necklace",
    price: 16500,
    category: "Necklaces",
    description:
      "Heavy anchor link chain in polished finish. A necklace with substance and presence. Designed to be noticed.",
    shortDescription: "Heavy anchor chain. Polished. Presence.",
    images: [
      { id: "7a", url: "", alt: "Anchor Link Necklace - front view" },
      { id: "7b", url: "", alt: "Anchor Link Necklace - detail view" },
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    limited: false,
    stock: 7,
    materials: "Steel alloy, polished chrome",
    sizes: ["18 inch", "20 inch", "22 inch", "24 inch"],
    careInstructions: [
      "Keep dry",
      "Store hanging to prevent tangling",
      "Clean with soft cloth",
    ],
    tags: ["anchor", "chain", "necklace", "heavy"],
  },
  {
    id: "8",
    name: "Onyx Band Ring",
    slug: "onyx-band-ring",
    price: 9500,
    category: "Rings",
    description:
      "Black onyx set in a clean band. Dark, confident, and designed for everyday wear with a touch of edge.",
    shortDescription: "Black onyx. Clean band. Everyday edge.",
    images: [
      { id: "8a", url: "", alt: "Onyx Band Ring - front view" },
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    limited: false,
    stock: 10,
    materials: "Onyx, zinc alloy band",
    sizes: ["6", "7", "8", "9", "10"],
    careInstructions: [
      "Avoid harsh chemicals",
      "Remove during sports",
      "Store in soft pouch",
    ],
    tags: ["onyx", "ring", "black", "band"],
  },
  {
    id: "9",
    name: "Chain Ring Set",
    slug: "chain-ring-set",
    price: 14500,
    category: "Rings",
    description:
      "Set of three chain-link rings in varying finishes. Mix, match, or stack. Versatile styling for any look.",
    shortDescription: "Three chain-link rings. Stack or style solo.",
    images: [
      { id: "9a", url: "", alt: "Chain Ring Set - full view" },
      { id: "9b", url: "", alt: "Chain Ring Set - individual rings" },
    ],
    featured: false,
    bestSeller: true,
    newArrival: false,
    limited: true,
    stock: 5,
    materials: "Steel alloy, mixed finishes",
    sizes: ["6/7/8", "7/8/9", "8/9/10"],
    careInstructions: [
      "Store set together",
      "Avoid water contact",
      "Polish individually",
    ],
    tags: ["ring set", "chain", "stack", "versatile"],
  },
  {
    id: "10",
    name: "Dragon Chain Bracelet",
    slug: "dragon-chain-bracelet",
    price: 17000,
    category: "Bracelets",
    description:
      "Interlocking dragon chain pattern in gunmetal finish. Inspired by street culture and built to last. A wearable statement.",
    shortDescription: "Dragon chain. Gunmetal. Street-built.",
    images: [
      { id: "10a", url: "", alt: "Dragon Chain Bracelet - front view" },
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    limited: false,
    stock: 8,
    materials: "Zinc alloy, gunmetal finish",
    sizes: ["S", "M", "L"],
    careInstructions: [
      "Keep away from moisture",
      "Do not force links open",
      "Store in dry place",
    ],
    tags: ["dragon", "chain", "bracelet", "gunmetal"],
  },
  {
    id: "11",
    name: "Cross Pendant Silver",
    slug: "cross-pendant-silver",
    price: 14000,
    category: "Necklaces",
    description:
      "Polished silver cross pendant on a fine box chain. Classic religious symbolism meets modern design.",
    shortDescription: "Silver cross. Fine chain. Modern classic.",
    images: [
      { id: "11a", url: "", alt: "Cross Pendant Silver - front view" },
      { id: "11b", url: "", alt: "Cross Pendant Silver - detail view" },
    ],
    featured: false,
    bestSeller: true,
    newArrival: false,
    limited: false,
    stock: 11,
    materials: " Sterling silver, box chain",
    sizes: ["16 inch", "18 inch", "20 inch"],
    careInstructions: [
      "Polish with silver cloth",
      "Remove before bathing",
      "Store in anti-tarnish bag",
    ],
    tags: ["cross", "silver", "religious", "classic"],
  },
  {
    id: "12",
    name: "Geometric Pendant",
    slug: "geometric-pendant",
    price: 11500,
    category: "Accessories",
    description:
      "Abstract geometric pendant with mixed metal tones. An artistic take on modern necklace design.",
    shortDescription: "Abstract geometry. Mixed metals. Artistic.",
    images: [
      { id: "12a", url: "", alt: "Geometric Pendant - front view" },
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    limited: false,
    stock: 7,
    materials: "Mixed metals, brushed finish",
    sizes: ["One Size"],
    careInstructions: [
      "Avoid moisture",
      "Store flat",
      "Handle gently",
    ],
    tags: ["geometric", "pendant", "artistic", "abstract"],
  },
  {
    id: "13",
    name: "Signet Stamp Ring",
    slug: "signet-stamp-ring",
    price: 9800,
    category: "Accessories",
    description:
      "Customisable signet ring with smooth face for personal stamps or insignia. A piece of identity on your finger.",
    shortDescription: "Customisable signet. Personal identity. Timeless.",
    images: [
      { id: "13a", url: "", alt: "Signet Stamp Ring - front view" },
    ],
    featured: false,
    bestSeller: false,
    newArrival: false,
    limited: true,
    stock: 3,
    materials: "Brass, gold plating",
    sizes: ["6", "7", "8", "9", "10"],
    careInstructions: [
      "Keep away from acids",
      "Clean with warm water",
      "Store in lined box",
    ],
    tags: ["signet", "custom", "identity", "stamp"],
  },
  {
    id: "14",
    name: "Rope Chain Necklace",
    slug: "rope-chain-necklace",
    price: 19000,
    category: "Necklaces",
    description:
      "Twisted rope chain in high-polish finish. One of the most recognised and respected chain styles. Impeccable weight.",
    shortDescription: "Twisted rope chain. High polish. Impeccable.",
    images: [
      { id: "14a", url: "", alt: "Rope Chain Necklace - front view" },
      { id: "14b", url: "", alt: "Rope Chain Necklace - detail view" },
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    limited: false,
    stock: 6,
    materials: "Stainless steel, high-polish finish",
    sizes: ["16 inch", "18 inch", "20 inch", "22 inch", "24 inch"],
    careInstructions: [
      "Avoid tangling",
      "Keep dry",
      "Store hanging or coiled",
    ],
    tags: ["rope", "chain", "necklace", "high-polish"],
  },
  {
    id: "15",
    name: "Cobra Bangle",
    slug: "cobra-bangle",
    price: 16000,
    category: "Bracelets",
    description:
      "Snake-inspired bangle with textured scales in silver tone. Flexible yet substantial. A piece with attitude.",
    shortDescription: "Snake-inspired. Textured scales. Attitude.",
    images: [
      { id: "15a", url: "", alt: "Cobra Bangle - front view" },
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    limited: false,
    stock: 7,
    materials: "Copper alloy, silver plating, flexible design",
    sizes: ["One Size"],
    careInstructions: [
      "Do not force open",
      "Avoid water",
      "Store in provided box",
    ],
    tags: ["snake", "bangle", "cobra", "textured"],
  },
  {
    id: "16",
    name: "Minimalist Bar Necklace",
    slug: "minimalist-bar-necklace",
    price: 10500,
    category: "Accessories",
    description:
      "Slim bar pendant on a delicate chain. Understated luxury for the wearer who prefers quiet confidence.",
    shortDescription: "Slim bar. Delicate chain. Quiet luxury.",
    images: [
      { id: "16a", url: "", alt: "Minimalist Bar Necklace - front view" },
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    limited: false,
    stock: 14,
    materials: "Stainless steel, matte finish",
    sizes: ["16 inch", "18 inch", "20 inch"],
    careInstructions: [
      "Wipe after wear",
      "Avoid chemicals",
      "Store in pouch",
    ],
    tags: ["minimalist", "bar", "delicate", "understated"],
  },
  {
    id: "17",
    name: " Skull Ring",
    slug: "skull-ring",
    price: 12500,
    category: "Rings",
    description:
      "Detailed skull ring in dark gunmetal. A rebellious piece with intricate detailing. Not for the faint-hearted.",
    shortDescription: "Detailed skull. Gunmetal. Rebellious.",
    images: [
      { id: "17a", url: "", alt: "Skull Ring - front view" },
    ],
    featured: false,
    bestSeller: false,
    newArrival: false,
    limited: false,
    stock: 5,
    materials: "Zinc alloy, gunmetal finish",
    sizes: ["6", "7", "8", "9", "10"],
    careInstructions: [
      "Keep dry",
      "Store in soft bag",
      "Avoid scratching",
    ],
    tags: ["skull", "ring", "gunmetal", "rebellious"],
  },
  {
    id: "18",
    name: "Twist Bracelet",
    slug: "twist-bracelet",
    price: 10000,
    category: "Bracelets",
    description:
      "Twisted cable bracelet in polished finish. Simple, elegant, and versatile. A staple for any accessory collection.",
    shortDescription: "Twisted cable. Polished. Versatile staple.",
    images: [
      { id: "18a", url: "", alt: "Twist Bracelet - front view" },
    ],
    featured: false,
    bestSeller: true,
    newArrival: false,
    limited: false,
    stock: 13,
    materials: "Stainless steel, polished chrome",
    sizes: ["S", "M", "L"],
    careInstructions: [
      "Wipe clean",
      "Avoid water exposure",
      "Store coiled",
    ],
    tags: ["twist", "bracelet", "cable", "polished"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find((p) => p.id === productId);
  if (!product) return products.slice(0, limit);
  return products.filter(
    (p) => p.id !== productId && p.category === product.category
  ).slice(0, limit);
}

export function getAllCategories(): string[] {
  return [...new Set(products.map((p) => p.category))];
}
