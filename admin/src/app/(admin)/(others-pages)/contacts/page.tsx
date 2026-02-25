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

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  adminNotes: string;
  createdAt: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const itemsPerPage = 12;

  const { token } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/contact?page=${currentPage}&limit=${itemsPerPage}`;
      if (statusFilter) url += `&status=${statusFilter}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data.contacts);
      setTotalEntries(response.data.totalContacts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching contacts:", error);
      toast.error("Failed to fetch contact queries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchContacts();
  }, [currentPage, statusFilter, token]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated successfully");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact query?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted successfully");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Contact Queries" />
      <div className="space-y-6">
        <ComponentCard title="Contact Queries">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-white/[0.05]">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Read">Read</option>
                <option value="Replied">Replied</option>
                <option value="Closed">Closed</option>
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
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Name</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Email</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Message</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Status</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Date</TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs">Actions</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                      {contacts.length > 0 ? (
                        contacts.map((c) => (
                          <TableRow key={c._id}>
                            <TableCell className="px-5 py-4">
                              <p className="font-medium text-gray-800 dark:text-white">{c.name}</p>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <p className="text-sm text-gray-700 dark:text-gray-300 break-all">{c.email}</p>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 max-w-xs">{c.message}</p>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <select
                                value={c.status}
                                onChange={(e) => handleStatusUpdate(c._id, e.target.value)}
                                className={`px-2 py-1 text-xs rounded border-0 font-medium ${
                                  c.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                  c.status === "Read" ? "bg-blue-100 text-blue-800" :
                                  c.status === "Replied" ? "bg-green-100 text-green-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Read">Read</option>
                                <option value="Replied">Replied</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-sm text-gray-500">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => { setSelectedContact(c); openModal(); }}
                                  className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(c._id)}
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
                          <TableCell colSpan={6} className="px-5 py-8 text-center text-gray-500">
                            No contact queries found
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
        {selectedContact && (
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 pr-8 text-gray-800 dark:text-white">Contact Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              <div><p className="text-xs sm:text-sm text-gray-500">Name</p><p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">{selectedContact.name}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Email</p><p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white break-all">{selectedContact.email}</p></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Status</p><Badge color={selectedContact.status === "Replied" ? "success" : selectedContact.status === "Pending" ? "warning" : selectedContact.status === "Read" ? "info" : "light"}>{selectedContact.status}</Badge></div>
              <div><p className="text-xs sm:text-sm text-gray-500">Date</p><p className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">{new Date(selectedContact.createdAt).toLocaleDateString()}</p></div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">Message</p>
              <p className="bg-gray-50 dark:bg-gray-800 p-2.5 sm:p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {selectedContact.message}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Contacts;
