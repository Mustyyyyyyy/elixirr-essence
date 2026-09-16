import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    images: [
      {
        id: String,
        url: String,
        alt: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    limited: { type: Boolean, default: false },
    stock: { type: Number, required: true, default: 0 },
    materials: { type: String, default: "" },
    sizes: [{ type: String }],
    careInstructions: [{ type: String }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;