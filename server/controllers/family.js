import Family from "../models/family.js";

export const createFamily = async (req, res) => {
  const {
    fatherStatus,
    motherStatus,
    guardian,
    totalChildren,
    city,
    children,
    note,
  } = req.body;
  try {
    const newFamily = await Family.create({
      fatherStatus,
      motherStatus,
      guardian,
      totalChildren,
      city,
      children,
      note,
    });
    res
      .status(201)
      .json({ message: "Family created successfully", family: newFamily });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFamilies = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  try {
    const totalFamilies = await Family.countDocuments();
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const families = await Family.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({
      families,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalFamilies / parseInt(limit)),
      totalFamilies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFamily = async (req, res) => {
  const { id } = req.params;
  try {
    const family = await Family.findById(id);
    if (!family) return res.status(404).json({ message: "Family not found" });
    res.status(200).json({ family });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFamily = async (req, res) => {
  const { id } = req.params;
  const {
    fatherStatus,
    motherStatus,
    guardian,
    totalChildren,
    city,
    children,
    note,
  } = req.body;
  try {
    const family = await Family.findByIdAndUpdate(
      id,
      {
        fatherStatus,
        motherStatus,
        guardian,
        totalChildren,
        city,
        children,
        note,
      },
      { new: true }
    );
    if (!family) return res.status(404).json({ message: "Family not found" });
    res.status(200).json({
      message: "Family updated successfully",
      family,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFamily = async (req, res) => {
  const { id } = req.params;
  try {
    const family = await Family.findByIdAndDelete(id);
    if (!family) return res.status(404).json({ message: "Family not found" });
    res.status(200).json({ message: "Family deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterFamilies = async (req, res) => {
  const { city, query, page = 1, limit = 12 } = req.query;

  let filters = {};

  // Filter by city
  if (city) {
    filters.city = { $regex: city, $options: "i" };
  }

  // General text search across different fields
  if (query) {
    filters.$or = [
      { guardian: { $regex: query, $options: "i" } },
      { city: { $regex: query, $options: "i" } },
      { note: { $regex: query, $options: "i" } },
      { "children.name": { $regex: query, $options: "i" } },
    ];
  }

  // Pagination setup
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  try {
    const totalFamilies = await Family.countDocuments(filters);
    const skip = (parsedPage - 1) * parsedLimit;

    const families = await Family.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit);

    res.json({
      families,
      currentPage: parsedPage,
      totalPages: Math.ceil(totalFamilies / parsedLimit),
      totalFamilies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCities = async (req, res) => {
  try {
    const cities = await Family.find().distinct("city");
    res.json({ cities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
