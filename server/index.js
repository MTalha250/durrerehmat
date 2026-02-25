import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";
import dashboardStatsRoutes from "./routes/dashboardStats.js";
import familyRoutes from "./routes/family.js";
import rateListRoutes from "./routes/rateList.js";
import sponsorshipRoutes from "./routes/sponsorship.js";
import volunteerRoutes from "./routes/volunteer.js";
import donationRoutes from "./routes/donation.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected");
});

db.on("error", (error) => {
  console.log(error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardStatsRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/rate-list", rateListRoutes);
app.use("/api/sponsorship", sponsorshipRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
