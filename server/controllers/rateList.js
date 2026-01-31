import RateList from "../models/rateList.js";

// Admin: Create rate list item
export const createRateListItem = async (req, res) => {
  const { category, itemName, description, price, unit } = req.body;
  try {
    const newItem = await RateList.create({
      category,
      itemName,
      description,
      price,
      unit,
    });
    res.status(201).json({ message: "Rate list item created successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all rate list items with pagination
export const getRateListItems = async (req, res) => {
  const { page = 1, limit = 20, category } = req.query;
  try {
    let filters = {};
    if (category) {
      filters.category = { $regex: category, $options: "i" };
    }

    const totalItems = await RateList.countDocuments(filters);
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const items = await RateList.find(filters)
      .sort({ category: 1, itemName: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      items,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItems / parseInt(limit)),
      totalItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get single rate list item
export const getRateListItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await RateList.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update rate list item
export const updateRateListItem = async (req, res) => {
  const { id } = req.params;
  const { category, itemName, description, price, unit, isActive } = req.body;
  try {
    const item = await RateList.findByIdAndUpdate(
      id,
      { category, itemName, description, price, unit, isActive },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete rate list item
export const deleteRateListItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await RateList.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await RateList.find().distinct("category");
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public: Get rate list items by category (for sponsorship form)
export const getPublicRateListByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const items = await RateList.find({
      category: { $regex: category, $options: "i" },
      isActive: true
    }).sort({ itemName: 1 });
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public: Get all active categories with their items
export const getPublicRateList = async (req, res) => {
  try {
    const items = await RateList.find({ isActive: true }).sort({ category: 1, itemName: 1 });

    // Group by category
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    res.status(200).json({ rateList: grouped });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
