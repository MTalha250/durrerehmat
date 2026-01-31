import Volunteer from "../models/volunteer.js";

// Public: Submit volunteer form
export const submitVolunteer = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    profession,
    gender,
    age,
    volunteerType,
    reasonForInterest,
  } = req.body;

  try {
    const volunteer = await Volunteer.create({
      fullName,
      email,
      phone,
      address,
      profession,
      gender,
      age,
      volunteerType,
      reasonForInterest,
    });

    res.status(201).json({
      message: "Thank you for your interest in volunteering. Our team will contact you shortly.",
      volunteer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all volunteers
export const getVolunteers = async (req, res) => {
  const { page = 1, limit = 12, status, volunteerType, search } = req.query;
  try {
    let filters = {};

    if (status) {
      filters.status = status;
    }

    if (volunteerType) {
      filters.volunteerType = volunteerType;
    }

    if (search) {
      filters.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { profession: { $regex: search, $options: "i" } },
      ];
    }

    const totalVolunteers = await Volunteer.countDocuments(filters);
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const volunteers = await Volunteer.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      volunteers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalVolunteers / parseInt(limit)),
      totalVolunteers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get single volunteer
export const getVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.status(200).json({ volunteer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update volunteer status
export const updateVolunteerStatus = async (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      id,
      { status, adminNotes },
      { new: true }
    );
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.status(200).json({ message: "Volunteer updated successfully", volunteer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete volunteer
export const deleteVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    const volunteer = await Volunteer.findByIdAndDelete(id);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.status(200).json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
