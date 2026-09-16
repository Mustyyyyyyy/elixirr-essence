import express from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats,
} from "../controllers/orderController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route for creating orders
router.post("/", createOrder);

// Protected admin routes
router.get("/", authenticate, authorize("admin", "editor"), getOrders);
router.get("/stats", authenticate, authorize("admin", "editor"), getOrderStats);
router.get("/:id", authenticate, authorize("admin", "editor"), getOrder);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "editor"),
  updateOrderStatus
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteOrder
);

export default router;