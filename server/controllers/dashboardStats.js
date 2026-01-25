import Family from "../models/family.js";

export const getDashboardStats = async (req, res) => {
  try {
    const familyCount = await Family.countDocuments();

    // Count total children across all families
    const childrenResult = await Family.aggregate([
      { $unwind: "$children" },
      { $count: "totalChildren" },
    ]);
    const totalChildren =
      childrenResult.length > 0 ? childrenResult[0].totalChildren : 0;

    res.status(200).json({
      familyCount,
      totalChildren,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
