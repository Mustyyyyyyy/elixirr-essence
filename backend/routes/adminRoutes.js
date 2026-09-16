import express from "express";
import {
  loginAdmin,
  getMe,
  updateProfile,
  changePassword,
  loginValidation,
  seedAdmin,
} from "../controllers/adminController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public auth routes
router.post("/login", loginValidation, loginAdmin);
router.post("/seed", seedAdmin);

// Protected routes
router.get("/me", authenticate, getMe);
router.put("/profile", authenticate, updateProfile);
router.put("/change-password", authenticate, changePassword);

export default router;