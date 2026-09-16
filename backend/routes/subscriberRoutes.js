import express from "express";
import { subscribe, getSubscribers } from "../controllers/subscriberController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", subscribe);
router.get("/", authenticate, authorize("admin", "editor"), getSubscribers);

export default router;
