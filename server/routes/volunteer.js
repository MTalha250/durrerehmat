import express from "express";
import {
  submitVolunteer,
  getVolunteers,
  getVolunteer,
  updateVolunteerStatus,
  deleteVolunteer,
} from "../controllers/volunteer.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public routes
router.post("/submit", submitVolunteer);

// Admin routes
router.get("/", verifyToken, verifyAdmin, getVolunteers);
router.get("/:id", verifyToken, verifyAdmin, getVolunteer);
router.put("/:id/status", verifyToken, verifyAdmin, updateVolunteerStatus);
router.delete("/:id", verifyToken, verifyAdmin, deleteVolunteer);

export default router;
