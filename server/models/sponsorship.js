import mongoose from "mongoose";

const selectedItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RateList",
  },
  itemName: String,
  category: String,
  price: Number,
  unit: String,
});

const sponsorshipSchema = new mongoose.Schema(
  {
    // Sponsor details
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
      min: 18,
    },
    // Child being sponsored
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: true,
    },
    childName: {
      type: String,
      required: true,
    },
    // Sponsorship type
    sponsorshipType: {
      type: String,
      required: true,
      enum: ["Comprehensive", "Partial"],
    },
    // For partial sponsorship
    partialCategories: {
      type: [String],
      default: [],
      enum: ["Food", "Education", "Medical", "Accessories"],
    },
    selectedItems: {
      type: [selectedItemSchema],
      default: [],
    },
    // Calculated total
    totalAmount: {
      type: Number,
      default: 0,
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

const Sponsorship = mongoose.models.Sponsorship || mongoose.model("Sponsorship", sponsorshipSchema);
export default Sponsorship;
