import express from "express";
import {
  uploadImage,
  uploadMultiple,
  deleteImage,
} from "../controllers/uploadController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/image",
  authenticate,
  authorize("admin", "editor"),
  upload.single("image"),
  uploadImage
);
router.post(
  "/images",
  authenticate,
  authorize("admin", "editor"),
  upload.array("images", 10),
  uploadMultiple
);
router.delete("/image", authenticate, authorize("admin", "editor"), deleteImage);

export default router;