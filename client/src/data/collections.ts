import type { Collection } from "../types/collection";

export const collections: Collection[] = [
  {
    id: "1",
    name: "New Arrivals",
    slug: "new-arrivals",
    description:
      "Fresh additions to the Elixirr Essence collection. Latest designs, just landed.",
    image: "",
    products: ["3", "6", "8", "10", "12", "15", "16"],
  },
  {
    id: "2",
    name: "Statement Necklaces",
    slug: "statement-necklaces",
    description:
      "Bold necklaces designed to be the centrepiece of any outfit.",
    image: "",
    products: ["1", "5", "7", "11", "14"],
  },
  {
    id: "3",
    name: "Rings",
    slug: "rings",
    description:
      "From minimalist bands to bold signet pieces. Every finger deserves an accent.",
    image: "",
    products: ["2", "4", "8", "9", "13", "17"],
  },
  {
    id: "4",
    name: "Bracelets",
    slug: "bracelets",
    description:
      "Chain, cuff, and bangle designs that define your wrist game.",
    image: "",
    products: ["3", "6", "10", "15", "18"],
  },
  {
    id: "5",
    name: "Best Sellers",
    slug: "best-sellers",
    description:
      "The pieces our community reaches for most. Timeless favourites, restocked.",
    image: "",
    products: ["1", "2", "5", "7", "9", "11", "14", "18"],
  },
  {
    id: "6",
    name: "Accessories",
    slug: "accessories",
    description:
      "The finishing touches. Rings, pendants, and unique pieces that complete the look.",
    image: "",
    products: ["12", "13", "16", "17"],
  },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
