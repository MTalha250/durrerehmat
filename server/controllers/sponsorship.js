import Sponsorship from "../models/sponsorship.js";
import Family from "../models/family.js";

// Public: Submit sponsorship form
export const submitSponsorship = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    profession,
    gender,
    age,
    childId,
    childName,
    familyId,
    sponsorshipType,
    partialCategories,
    selectedItems,
    totalAmount,
  } = req.body;

  try {
    const sponsorship = await Sponsorship.create({
      fullName,
      email,
      phone,
      address,
      profession,
      gender,
      age,
      childId: familyId, // Store family ID for reference
      childName,
      sponsorshipType,
      partialCategories: partialCategories || [],
      selectedItems: selectedItems || [],
      totalAmount: totalAmount || 0,
    });

    res.status(201).json({
      message: "Thank you for your interest in sponsoring a child. Our team will contact you shortly.",
      sponsorship,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all sponsorships
export const getSponsorships = async (req, res) => {
  const { page = 1, limit = 12, status, search } = req.query;
  try {
    let filters = {};

    if (status) {
      filters.status = status;
    }

    if (search) {
      filters.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { childName: { $regex: search, $options: "i" } },
      ];
    }

    const totalSponsorships = await Sponsorship.countDocuments(filters);
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sponsorships = await Sponsorship.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      sponsorships,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalSponsorships / parseInt(limit)),
      totalSponsorships,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get single sponsorship
export const getSponsorship = async (req, res) => {
  const { id } = req.params;
  try {
    const sponsorship = await Sponsorship.findById(id);
    if (!sponsorship) return res.status(404).json({ message: "Sponsorship not found" });
    res.status(200).json({ sponsorship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update sponsorship status
export const updateSponsorshipStatus = async (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  try {
    const sponsorship = await Sponsorship.findByIdAndUpdate(
      id,
      { status, adminNotes },
      { new: true }
    );
    if (!sponsorship) return res.status(404).json({ message: "Sponsorship not found" });

    // If approved, update child's sponsorship status
    if (status === "Approved" && sponsorship.childId) {
      // Find the family and update the child's sponsorship status
      const family = await Family.findById(sponsorship.childId);
      if (family) {
        const childIndex = family.children.findIndex(
          (c) => c.name === sponsorship.childName
        );
        if (childIndex !== -1) {
          if (sponsorship.sponsorshipType === "Comprehensive") {
            family.children[childIndex].sponsorshipStatus = "full";
            family.children[childIndex].sponsoredCategories = ["Food", "Education", "Medical", "Accessories"];
          } else {
            // Merge existing and new categories
            const existingCategories = family.children[childIndex].sponsoredCategories || [];
            const newCategories = [...new Set([...existingCategories, ...sponsorship.partialCategories])];
            family.children[childIndex].sponsoredCategories = newCategories;

            // Check if all categories are now sponsored
            if (newCategories.length >= 4) {
              family.children[childIndex].sponsorshipStatus = "full";
            } else {
              family.children[childIndex].sponsorshipStatus = "partial";
            }
          }
          await family.save();
        }
      }
    }

    res.status(200).json({ message: "Sponsorship updated successfully", sponsorship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete sponsorship
export const deleteSponsorship = async (req, res) => {
  const { id } = req.params;
  try {
    const sponsorship = await Sponsorship.findByIdAndDelete(id);
    if (!sponsorship) return res.status(404).json({ message: "Sponsorship not found" });
    res.status(200).json({ message: "Sponsorship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public: Get available children for sponsorship (not fully sponsored)
export const getAvailableChildren = async (req, res) => {
  try {
    const families = await Family.find({
      "children.sponsorshipStatus": { $ne: "full" }
    }).select("-note");

    // Extract children that are not fully sponsored
    const availableChildren = [];
    families.forEach((family) => {
      family.children.forEach((child) => {
        if (child.sponsorshipStatus !== "full") {
          availableChildren.push({
            familyId: family._id,
            childId: child._id,
            childName: child.name,
            dateOfBirth: child.dateOfBirth,
            description: child.description,
            city: family.city,
            guardian: family.guardian,
            sponsorshipStatus: child.sponsorshipStatus,
            sponsoredCategories: child.sponsoredCategories || [],
          });
        }
      });
    });

    res.status(200).json({ children: availableChildren });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
