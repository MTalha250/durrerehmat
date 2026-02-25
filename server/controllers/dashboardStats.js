import Family from "../models/family.js";
import Sponsorship from "../models/sponsorship.js";
import Volunteer from "../models/volunteer.js";
import Donation from "../models/donation.js";
import Contact from "../models/contact.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Family and children counts
    const familyCount = await Family.countDocuments();
    const childrenResult = await Family.aggregate([
      { $unwind: "$children" },
      { $count: "totalChildren" },
    ]);
    const totalChildren =
      childrenResult.length > 0 ? childrenResult[0].totalChildren : 0;

    // Cities count
    const citiesCount = (await Family.find().distinct("city")).length;

    // Sponsorship counts
    const totalSponsorships = await Sponsorship.countDocuments();
    const pendingSponsorships = await Sponsorship.countDocuments({ status: "pending" });
    const activeSponsorships = await Sponsorship.countDocuments({ status: "approved" });

    // Volunteer counts
    const totalVolunteers = await Volunteer.countDocuments();
    const pendingVolunteers = await Volunteer.countDocuments({ status: "pending" });
    const activeVolunteers = await Volunteer.countDocuments({ status: "approved" });

    // Donation counts and totals
    const totalDonations = await Donation.countDocuments();
    const pendingDonations = await Donation.countDocuments({ status: "pending" });
    const donationAmountResult = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalDonationAmount =
      donationAmountResult.length > 0 ? donationAmountResult[0].total : 0;

    // Contact counts
    const totalContacts = await Contact.countDocuments();
    const pendingContacts = await Contact.countDocuments({ status: "Pending" });

    res.status(200).json({
      familyCount,
      totalChildren,
      citiesCount,
      totalSponsorships,
      pendingSponsorships,
      activeSponsorships,
      totalVolunteers,
      pendingVolunteers,
      activeVolunteers,
      totalDonations,
      pendingDonations,
      totalDonationAmount,
      totalContacts,
      pendingContacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
