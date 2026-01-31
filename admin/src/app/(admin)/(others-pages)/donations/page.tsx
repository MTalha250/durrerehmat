"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Trash2, Loader2, Flag } from "lucide-react";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";

interface Donation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  donationType: string;
  inKindDetails: string;
  amount: number;
  interestedInFundraiser: boolean;
  fundraiserDetails: string;
  status: string;
  adminNotes: string;
  createdAt: string;
}

const Donations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const itemsPerPage = 12;

  const { token } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  const fetchDonations = async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/donation?page=${currentPage}&limit=${itemsPerPage}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (typeFilter) url += `&donationType=${typeFilter}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations(response.data.donations);
      setTotalEntries(response.data.totalDonations);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching donations:", error);
      toast.error("Failed to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchDonations();
  }, [currentPage, statusFilter, typeFilter, token]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/donation/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated successfully");
      fetchDonations();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this donation inquiry?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/donation/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted successfully");
      fetchDonations();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const getDonationTypeColor = (type: string) => {
    switch (type) {
      case "One-time": return "primary";
      case "Monthly": return "success";
      case "In-kind": return "warning";
      default: return "light";
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Donation Inquiries" />
      <div className="space-y-6">
        <ComponentCard title="Donation Management">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex flex-wrap gap-4 justify-between items-center p-4 border-b border-gray-100 dark:border-white/[0.05]">
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">All Types</option>
                  <option value="One-time">One-time</option>
                  <option value="Monthly">Monthly</option>
                  <option value="In-kind">In-kind</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">Total: {totalEntries}</div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              </div>
            ) : (
              <>
                <div className="max-w-full overflow-x-auto">
                  <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                      <TableRow>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Donor</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Contact</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Type</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Amount</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Fundraiser</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Status</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Date</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Actions</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                      {donations.length > 0 ? (
                        donations.map((d) => (
                          <TableRow key={d._id}>
                            <TableCell className="px-5 py-4">
                              <p className="font-medium text-gray-800 dark:text-white">{d.name}</p>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <p className="text-sm text-gray-700 dark:text-gray-300">{d.email}</p>
                              <p className="text-xs text-gray-500">{d.phone}</p>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <Badge color={getDonationTypeColor(d.donationType) as any} size="sm">
                                {d.donationType}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 font-semibold text-gray-800 dark:text-white">
                              {d.amount > 0 ? `PKR ${d.amount.toLocaleString()}` : "-"}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              {d.interestedInFundraiser ? (
                                <span className="flex items-center gap-1 text-orange-600">
                                  <Flag className="w-4 h-4" /> Yes
                                </span>
                              ) : (
                                <span className="text-gray-400">No</span>
                              )}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <select
                                value={d.status}
                                onChange={(e) => handleStatusUpdate(d._id, e.target.value)}
                                className={`px-2 py-1 text-xs rounded border-0 font-medium ${
                                  d.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                  d.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                                  d.status === "Completed" ? "bg-green-100 text-green-800" :
                                  "bg-red-100 text-red-800"
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Completed">Completed</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-sm text-gray-500">
                              {new Date(d.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => { setSelectedDonation(d); openModal(); }}
                                  className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(d._id)}
                                  className="p-1.5 rounded-md text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="px-5 py-8 text-center text-gray-500">
                            No donation inquiries found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {totalEntries > 0 ? `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, totalEntries)} of ${totalEntries}` : "No entries"}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded border disabled:opacity-50">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="px-3">{currentPage} / {totalPages || 1}</span>
                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded border disabled:opacity-50">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </ComponentCard>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-2xl">
        {selectedDonation && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Donation Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{selectedDonation.name}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedDonation.email}</p></div>
              <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedDonation.phone}</p></div>
              <div><p className="text-sm text-gray-500">Address</p><p className="font-medium">{selectedDonation.address}</p></div>
              <div><p className="text-sm text-gray-500">Donation Type</p><Badge color={getDonationTypeColor(selectedDonation.donationType) as any}>{selectedDonation.donationType}</Badge></div>
              <div><p className="text-sm text-gray-500">Amount</p><p className="font-medium">{selectedDonation.amount > 0 ? `PKR ${selectedDonation.amount.toLocaleString()}` : "Not specified"}</p></div>
            </div>

            {selectedDonation.donationType === "In-kind" && selectedDonation.inKindDetails && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">In-Kind Donation Details</p>
                <p className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-gray-700 dark:text-gray-300">
                  {selectedDonation.inKindDetails}
                </p>
              </div>
            )}

            {selectedDonation.interestedInFundraiser && (
              <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-medium mb-2">
                  <Flag className="w-4 h-4" /> Interested in Starting a Fundraiser
                </p>
                {selectedDonation.fundraiserDetails && (
                  <p className="text-gray-700 dark:text-gray-300">{selectedDonation.fundraiserDetails}</p>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Donations;
