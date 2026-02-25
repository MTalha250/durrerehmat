import express from "express";
import {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public routes
router.post("/submit", submitContact);

// Admin routes
router.get("/", verifyToken, verifyAdmin, getContacts);
router.get("/:id", verifyToken, verifyAdmin, getContact);
router.put("/:id/status", verifyToken, verifyAdmin, updateContactStatus);
router.delete("/:id", verifyToken, verifyAdmin, deleteContact);

export default router;
