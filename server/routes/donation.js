import express from "express";
import {
  submitDonation,
  getDonations,
  getDonation,
  updateDonationStatus,
  deleteDonation,
  getDonationStats,
} from "../controllers/donation.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public routes
router.post("/submit", submitDonation);

// Admin routes
router.get("/", verifyToken, verifyAdmin, getDonations);
router.get("/stats", verifyToken, verifyAdmin, getDonationStats);
router.get("/:id", verifyToken, verifyAdmin, getDonation);
router.put("/:id/status", verifyToken, verifyAdmin, updateDonationStatus);
router.delete("/:id", verifyToken, verifyAdmin, deleteDonation);

export default router;
