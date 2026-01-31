import express from "express";
import {
  createFamily,
  getFamilies,
  getFamily,
  updateFamily,
  deleteFamily,
  filterFamilies,
  getCities,
  getPublicFamilies,
  getPublicFamily,
  getPublicCities,
  getFamilyStats,
} from "../controllers/family.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/public", getPublicFamilies);
router.get("/public/stats", getFamilyStats);
router.get("/public/cities", getPublicCities);
router.get("/public/:id", getPublicFamily);

// Admin routes (authentication required)
router.post("/", verifyToken, verifyAdmin, createFamily);
router.get("/", verifyToken, verifyAdmin, getFamilies);
router.get("/filter", verifyToken, verifyAdmin, filterFamilies);
router.get("/cities", verifyToken, verifyAdmin, getCities);
router.get("/:id", verifyToken, verifyAdmin, getFamily);
router.put("/:id", verifyToken, verifyAdmin, updateFamily);
router.delete("/:id", verifyToken, verifyAdmin, deleteFamily);

export default router;
