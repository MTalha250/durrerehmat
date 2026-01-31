import express from "express";
import {
  submitSponsorship,
  getSponsorships,
  getSponsorship,
  updateSponsorshipStatus,
  deleteSponsorship,
  getAvailableChildren,
} from "../controllers/sponsorship.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public routes
router.post("/submit", submitSponsorship);
router.get("/available-children", getAvailableChildren);

// Admin routes
router.get("/", verifyToken, verifyAdmin, getSponsorships);
router.get("/:id", verifyToken, verifyAdmin, getSponsorship);
router.put("/:id/status", verifyToken, verifyAdmin, updateSponsorshipStatus);
router.delete("/:id", verifyToken, verifyAdmin, deleteSponsorship);

export default router;
