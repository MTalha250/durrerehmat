import mongoose from "mongoose";
import dotenv from "dotenv";
import RateList from "../models/rateList.js";

dotenv.config();

const rateListItems = [
  // Food Category
  {
    category: "Food",
    itemName: "Daily Meals",
    description: "Three nutritious meals per day for a child",
    price: 3000,
    unit: "per month",
    isActive: true,
  },
  {
    category: "Food",
    itemName: "Breakfast",
    description: "Healthy breakfast including eggs, bread, and milk",
    price: 1000,
    unit: "per month",
    isActive: true,
  },
  {
    category: "Food",
    itemName: "Lunch",
    description: "Full lunch meal with rice, vegetables, and protein",
    price: 1200,
    unit: "per month",
    isActive: true,
  },
  {
    category: "Food",
    itemName: "Dinner",
    description: "Complete dinner meal",
    price: 1200,
    unit: "per month",
    isActive: true,
  },
  {
    category: "Food",
    itemName: "Snacks & Fruits",
    description: "Daily healthy snacks and seasonal fruits",
    price: 800,
    unit: "per month",
    isActive: true,
  },
  {
    category: "Food",
    itemName: "Special Occasion Meal",
    description: "Biryani or special meal for Eid and celebrations",
    price: 500,
    unit: "per meal",
    isActive: true,
  },

  // Education Category
  {
    category: "Education",
    itemName: "School Fee",
    description: "Monthly tuition fee for quality education",
    price: 2500,
    unit: "per month",
    isActive: true,
  },
  {
    category: "Education",
    itemName: "School Books",
    description: "Complete set of textbooks for the academic year",
    price: 3500,
    unit: "per year",
    isActive: true,
  },
  {
    category: "Education",
    itemName: "Notebooks & Stationery",
    description: "Notebooks, pens, pencils, and other supplies",
    price: 1500,
    unit: "per year",
    isActive: true,
  },
  {
    category: "Education",
    itemName: "School Bag",
    description: "Quality school bag for carrying books",
    price: 1200,
    unit: "per item",
    isActive: true,
  },
  {
    category: "Education",
    itemName: "Tuition Classes",
    description: "Extra tuition for weak subjects",
    price: 1500,
    unit: "per month",
    isActive: true,
  },
  {
    category: "Education",
    itemName: "Computer Classes",
    description: "Basic computer education and skills",
    price: 1000,
    unit: "per month",
    isActive: true,
  },
  {
    category: "Education",
    itemName: "Quran Classes",
    description: "Daily Quran recitation and Islamic education",
    price: 800,
    unit: "per month",
    isActive: true,
  },

  // Medical Category
  {
    category: "Medical",
    itemName: "Monthly Health Checkup",
    description: "Regular health examination and monitoring",
    price: 500,
    unit: "per visit",
    isActive: true,
  },
  {
    category: "Medical",
    itemName: "Medicines",
    description: "Basic medicines and first aid supplies",
    price: 1000,
    unit: "per month",
    isActive: true,
  },
  {
    category: "Medical",
    itemName: "Dental Checkup",
    description: "Regular dental examination and cleaning",
    price: 800,
    unit: "per visit",
    isActive: true,
  },
  {
    category: "Medical",
    itemName: "Eye Checkup",
    description: "Vision testing and eye examination",
    price: 600,
    unit: "per visit",
    isActive: true,
  },
  {
    category: "Medical",
    itemName: "Glasses",
    description: "Prescription glasses if needed",
    price: 2000,
    unit: "per item",
    isActive: true,
  },
  {
    category: "Medical",
    itemName: "Vaccination",
    description: "Required vaccinations and immunizations",
    price: 1500,
    unit: "per year",
    isActive: true,
  },
  {
    category: "Medical",
    itemName: "Emergency Medical Care",
    description: "Emergency medical treatment fund",
    price: 5000,
    unit: "per year",
    isActive: true,
  },

  // Accessories Category
  {
    category: "Accessories",
    itemName: "School Uniform",
    description: "Complete school uniform set (2 pairs)",
    price: 3000,
    unit: "per year",
    isActive: true,
  },
  {
    category: "Accessories",
    itemName: "School Shoes",
    description: "Quality school shoes",
    price: 1500,
    unit: "per item",
    isActive: true,
  },
  {
    category: "Accessories",
    itemName: "Winter Clothes",
    description: "Warm sweater, jacket, and winter wear",
    price: 2500,
    unit: "per year",
    isActive: true,
  },
  {
    category: "Accessories",
    itemName: "Summer Clothes",
    description: "Cotton clothes for summer season",
    price: 2000,
    unit: "per year",
    isActive: true,
  },
  {
    category: "Accessories",
    itemName: "Eid Clothes",
    description: "New clothes for Eid celebration",
    price: 2500,
    unit: "per item",
    isActive: true,
  },
  {
    category: "Accessories",
    itemName: "Bedding Set",
    description: "Mattress, pillow, and blanket",
    price: 3000,
    unit: "per item",
    isActive: true,
  },
  {
    category: "Accessories",
    itemName: "Hygiene Kit",
    description: "Soap, toothbrush, toothpaste, and personal care items",
    price: 500,
    unit: "per month",
    isActive: true,
  },
];

const seedRateList = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing rate list items
    await RateList.deleteMany({});
    console.log("Cleared existing rate list items");

    // Insert new items
    const result = await RateList.insertMany(rateListItems);
    console.log(`Successfully seeded ${result.length} rate list items`);

    // Display summary by category
    const categories = [...new Set(rateListItems.map((item) => item.category))];
    for (const category of categories) {
      const count = rateListItems.filter((item) => item.category === category).length;
      console.log(`  - ${category}: ${count} items`);
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding rate list:", error);
    process.exit(1);
  }
};

seedRateList();
