import express from "express";
import {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  productValidation,
} from "../controllers/productController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProductById);

// Protected admin routes
router.post(
  "/",
  authenticate,
  authorize("admin"),
  productValidation,
  createProduct
);
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  productValidation,
  updateProduct
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteProduct
);

export default router;