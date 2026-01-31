import Donation from "../models/donation.js";

// Public: Submit donation form
export const submitDonation = async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    donationType,
    inKindDetails,
    amount,
    interestedInFundraiser,
    fundraiserDetails,
  } = req.body;

  try {
    const donation = await Donation.create({
      name,
      email,
      phone,
      address,
      donationType,
      inKindDetails: inKindDetails || "",
      amount: amount || 0,
      interestedInFundraiser: interestedInFundraiser || false,
      fundraiserDetails: fundraiserDetails || "",
    });

    res.status(201).json({
      message: "Thank you for your generous donation interest. Our team will contact you shortly.",
      donation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all donations
export const getDonations = async (req, res) => {
  const { page = 1, limit = 12, status, donationType, search } = req.query;
  try {
    let filters = {};

    if (status) {
      filters.status = status;
    }

    if (donationType) {
      filters.donationType = donationType;
    }

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const totalDonations = await Donation.countDocuments(filters);
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const donations = await Donation.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      donations,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalDonations / parseInt(limit)),
      totalDonations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get single donation
export const getDonation = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findById(id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.status(200).json({ donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update donation status
export const updateDonationStatus = async (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  try {
    const donation = await Donation.findByIdAndUpdate(
      id,
      { status, adminNotes },
      { new: true }
    );
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.status(200).json({ message: "Donation updated successfully", donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete donation
export const deleteDonation = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findByIdAndDelete(id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get donation stats
export const getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const pendingDonations = await Donation.countDocuments({ status: "Pending" });
    const completedDonations = await Donation.countDocuments({ status: "Completed" });
    const fundraiserInterests = await Donation.countDocuments({ interestedInFundraiser: true });

    res.status(200).json({
      totalDonations,
      pendingDonations,
      completedDonations,
      fundraiserInterests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
