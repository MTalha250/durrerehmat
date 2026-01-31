import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
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
    profession: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    age: {
      type: Number,
      required: true,
      min: 16,
    },
    volunteerType: {
      type: String,
      required: true,
      enum: ["Teaching", "Healthcare", "Administrative", "Event Management", "Fundraising", "Mentorship", "Other"],
    },
    reasonForInterest: {
      type: String,
      required: true,
    },
    // Status tracking
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Contacted", "Approved", "Rejected"],
    },
    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Volunteer = mongoose.models.Volunteer || mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;
