import express from "express";
import {
  createRateListItem,
  getRateListItems,
  getRateListItem,
  updateRateListItem,
  deleteRateListItem,
  getCategories,
  getPublicRateListByCategory,
  getPublicRateList,
} from "../controllers/rateList.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public routes
router.get("/public", getPublicRateList);
router.get("/public/:category", getPublicRateListByCategory);

// Admin routes
router.post("/", verifyToken, verifyAdmin, createRateListItem);
router.get("/", verifyToken, verifyAdmin, getRateListItems);
router.get("/categories", verifyToken, verifyAdmin, getCategories);
router.get("/:id", verifyToken, verifyAdmin, getRateListItem);
router.put("/:id", verifyToken, verifyAdmin, updateRateListItem);
router.delete("/:id", verifyToken, verifyAdmin, deleteRateListItem);

export default router;
