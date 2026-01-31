import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  // Sponsorship tracking
  sponsorshipStatus: {
    type: String,
    default: "none",
    enum: ["none", "partial", "full"],
  },
  sponsoredCategories: {
    type: [String],
    default: [],
    enum: ["Food", "Education", "Medical", "Accessories"],
  },
});

const familySchema = new mongoose.Schema(
  {
    fatherStatus: {
      type: String,
      required: true,
      enum: ["Alive", "Deceased", "Disabled", "Unknown"],
    },
    motherStatus: {
      type: String,
      required: true,
      enum: ["Alive", "Deceased", "Disabled", "Unknown"],
    },
    guardian: {
      type: String,
      required: true,
      trim: true,
    },
    totalChildren: {
      type: Number,
      required: true,
      min: 0,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    children: {
      type: [childSchema],
      default: [],
    },
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Family =
  mongoose.models.Family || mongoose.model("Family", familySchema);

export default Family;
