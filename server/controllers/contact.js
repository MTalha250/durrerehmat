import Contact from "../models/contact.js";

// Public: Submit contact form
export const submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      message: "Thank you for reaching out. We will get back to you soon.",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all contacts
export const getContacts = async (req, res) => {
  const { page = 1, limit = 12, status, search } = req.query;
  try {
    let filters = {};

    if (status) {
      filters.status = status;
    }

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const totalContacts = await Contact.countDocuments(filters);
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const contacts = await Contact.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      contacts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalContacts / parseInt(limit)),
      totalContacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get single contact
export const getContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update contact status
export const updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status, adminNotes },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact updated successfully", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete contact
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
