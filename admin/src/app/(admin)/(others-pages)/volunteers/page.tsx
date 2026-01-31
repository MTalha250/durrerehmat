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

interface Volunteer {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profession: string;
  gender: string;
  age: number;
  volunteerType: string;
  reasonForInterest: string;
  status: string;
  adminNotes: string;
  createdAt: string;
}

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const itemsPerPage = 12;

  const { token } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/volunteer?page=${currentPage}&limit=${itemsPerPage}`;
      if (statusFilter) url += `&status=${statusFilter}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVolunteers(response.data.volunteers);
      setTotalEntries(response.data.totalVolunteers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching volunteers:", error);
      toast.error("Failed to fetch volunteers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchVolunteers();
  }, [currentPage, statusFilter, token]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/volunteer/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated successfully");
      fetchVolunteers();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this volunteer application?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/volunteer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted successfully");
      fetchVolunteers();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const getVolunteerTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Teaching: "primary",
      Healthcare: "success",
      Administrative: "info",
      "Event Management": "warning",
      Fundraising: "error",
      Mentorship: "light",
    };
    return colors[type] || "light";
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Volunteer Applications" />
      <div className="space-y-6">
        <ComponentCard title="Volunteer Management">
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
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Volunteer</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Contact</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Type</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Profession</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Status</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Date</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Actions</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                      {volunteers.length > 0 ? (
                        volunteers.map((v) => (
                          <TableRow key={v._id}>
                            <TableCell className="px-5 py-4">
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white">{v.fullName}</p>
                                <p className="text-xs text-gray-500">{v.gender}, {v.age} years</p>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <p className="text-sm text-gray-700 dark:text-gray-300">{v.email}</p>
                              <p className="text-xs text-gray-500">{v.phone}</p>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <Badge color={getVolunteerTypeColor(v.volunteerType) as any} size="sm">
                                {v.volunteerType}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">{v.profession}</TableCell>
                            <TableCell className="px-4 py-3">
                              <select
                                value={v.status}
                                onChange={(e) => handleStatusUpdate(v._id, e.target.value)}
                                className={`px-2 py-1 text-xs rounded border-0 font-medium ${
                                  v.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                  v.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                                  v.status === "Approved" ? "bg-green-100 text-green-800" :
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
                              {new Date(v.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => { setSelectedVolunteer(v); openModal(); }}
                                  className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(v._id)}
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
                            No volunteer applications found
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
        {selectedVolunteer && (
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 pr-8 text-gray-800 dark:text-white">Volunteer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              <div><p className="text-xs sm:text-sm text-gray-500">Full Name</p><p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">{selectedVolunteer.fullName}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Email</p><p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white break-all">{selectedVolunteer.email}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Phone</p><p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">{selectedVolunteer.phone}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Address</p><p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">{selectedVolunteer.address}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Profession</p><p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">{selectedVolunteer.profession}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Gender / Age</p><p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">{selectedVolunteer.gender}, {selectedVolunteer.age} years</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Volunteer Type</p><Badge color={getVolunteerTypeColor(selectedVolunteer.volunteerType) as any}>{selectedVolunteer.volunteerType}</Badge></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Status</p><Badge color={selectedVolunteer.status === "Approved" ? "success" : selectedVolunteer.status === "Pending" ? "warning" : "error"}>{selectedVolunteer.status}</Badge></div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">Reason for Interest</p>
              <p className="bg-gray-50 dark:bg-gray-800 p-2.5 sm:p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                {selectedVolunteer.reasonForInterest}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Volunteers;
