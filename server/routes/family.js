import express from "express";
import {
  createFamily,
  getFamilies,
  getFamily,
  updateFamily,
  deleteFamily,
  filterFamilies,
  getCities,
} from "../controllers/family.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, createFamily);
router.get("/", verifyToken, verifyAdmin, getFamilies);
router.get("/filter", verifyToken, verifyAdmin, filterFamilies);
router.get("/cities", verifyToken, verifyAdmin, getCities);
router.get("/:id", verifyToken, verifyAdmin, getFamily);
router.put("/:id", verifyToken, verifyAdmin, updateFamily);
router.delete("/:id", verifyToken, verifyAdmin, deleteFamily);

export default router;
