import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    donationType: {
      type: String,
      required: true,
      enum: ["One-time", "Monthly", "In-kind"],
    },
    // For in-kind donations
    inKindDetails: {
      type: String,
      default: "",
    },
    // Amount (optional, for monetary donations)
    amount: {
      type: Number,
      default: 0,
    },
    // Fundraiser interest
    interestedInFundraiser: {
      type: Boolean,
      default: false,
    },
    fundraiserDetails: {
      type: String,
      default: "",
    },
    // Status tracking
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Contacted", "Completed", "Rejected"],
    },
    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema);
export default Donation;
