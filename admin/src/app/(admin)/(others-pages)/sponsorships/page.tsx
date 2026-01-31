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
import { ChevronLeft, ChevronRight, Eye, Trash2, Loader2 } from "lucide-react";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";

interface Sponsorship {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profession: string;
  gender: string;
  age: number;
  childName: string;
  sponsorshipType: string;
  partialCategories: string[];
  selectedItems: { itemName: string; category: string; price: number; unit: string }[];
  totalAmount: number;
  status: string;
  adminNotes: string;
  createdAt: string;
}

const Sponsorships = () => {
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedSponsorship, setSelectedSponsorship] = useState<Sponsorship | null>(null);
  const itemsPerPage = 12;

  const { token } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  const fetchSponsorships = async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/sponsorship?page=${currentPage}&limit=${itemsPerPage}`;
      if (statusFilter) url += `&status=${statusFilter}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSponsorships(response.data.sponsorships);
      setTotalEntries(response.data.totalSponsorships);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching sponsorships:", error);
      toast.error("Failed to fetch sponsorships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchSponsorships();
  }, [currentPage, statusFilter, token]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/sponsorship/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated successfully");
      fetchSponsorships();
      if (selectedSponsorship?._id === id) {
        setSelectedSponsorship({ ...selectedSponsorship, status: newStatus });
      }
    } catch (error) {
      console.log("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sponsorship request?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/sponsorship/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted successfully");
      fetchSponsorships();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "warning";
      case "Contacted": return "info";
      case "Approved": return "success";
      case "Rejected": return "error";
      default: return "light";
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Sponsorship Requests" />
      <div className="space-y-6">
        <ComponentCard title="Sponsorship Management">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-white/[0.05]">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Contacted">Contacted</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
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
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Sponsor</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Child</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Type</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Amount</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Status</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Date</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Actions</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                      {sponsorships.length > 0 ? (
                        sponsorships.map((s) => (
                          <TableRow key={s._id}>
                            <TableCell className="px-5 py-4">
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white">{s.fullName}</p>
                                <p className="text-xs text-gray-500">{s.email}</p>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">{s.childName}</TableCell>
                            <TableCell className="px-4 py-3">
                              <Badge color={s.sponsorshipType === "Comprehensive" ? "success" : "info"} size="sm">
                                {s.sponsorshipType}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 font-semibold text-gray-800 dark:text-white">
                              PKR {s.totalAmount.toLocaleString()}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <select
                                value={s.status}
                                onChange={(e) => handleStatusUpdate(s._id, e.target.value)}
                                className={`px-2 py-1 text-xs rounded border-0 font-medium ${
                                  s.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                  s.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                                  s.status === "Approved" ? "bg-green-100 text-green-800" :
                                  "bg-red-100 text-red-800"
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-sm text-gray-500">
                              {new Date(s.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => { setSelectedSponsorship(s); openModal(); }}
                                  className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(s._id)}
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
                          <TableCell colSpan={7} className="px-5 py-8 text-center text-gray-500">
                            No sponsorship requests found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
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
        {selectedSponsorship && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sponsorship Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium">{selectedSponsorship.fullName}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedSponsorship.email}</p></div>
              <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedSponsorship.phone}</p></div>
              <div><p className="text-sm text-gray-500">Address</p><p className="font-medium">{selectedSponsorship.address}</p></div>
              <div><p className="text-sm text-gray-500">Profession</p><p className="font-medium">{selectedSponsorship.profession}</p></div>
              <div><p className="text-sm text-gray-500">Gender / Age</p><p className="font-medium">{selectedSponsorship.gender}, {selectedSponsorship.age} years</p></div>
              <div><p className="text-sm text-gray-500">Child Name</p><p className="font-medium">{selectedSponsorship.childName}</p></div>
              <div><p className="text-sm text-gray-500">Sponsorship Type</p><Badge color={selectedSponsorship.sponsorshipType === "Comprehensive" ? "success" : "info"}>{selectedSponsorship.sponsorshipType}</Badge></div>
            </div>
            {selectedSponsorship.partialCategories.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Selected Categories</p>
                <div className="flex gap-2">{selectedSponsorship.partialCategories.map((cat) => <Badge key={cat} color="primary">{cat}</Badge>)}</div>
              </div>
            )}
            {selectedSponsorship.selectedItems.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Selected Items</p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                  {selectedSponsorship.selectedItems.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.itemName} ({item.category})</span>
                      <span className="font-medium">PKR {item.price} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="border-t pt-4">
              <p className="text-lg font-semibold">Total Amount: PKR {selectedSponsorship.totalAmount.toLocaleString()}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Sponsorships;
