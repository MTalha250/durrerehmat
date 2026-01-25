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
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2, Loader2, Users, Eye } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { Family } from "@/types";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";

const Families = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [families, setFamilies] = useState<Family[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const itemsPerPage = 12;

  const { token } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal();

  const fetchFamilies = async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/family?page=${currentPage}&limit=${itemsPerPage}`;

      if (searchTerm) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/family/filter?query=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFamilies(response.data.families);
      setTotalEntries(response.data.totalFamilies);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching families:", error);
      toast.error("Failed to fetch families");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFamilies();
    }
  }, [currentPage, token]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (token) {
        setCurrentPage(1);
        fetchFamilies();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteFamily = async (id: string) => {
    if (!confirm("Are you sure you want to delete this family?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/family/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Family deleted successfully");
      fetchFamilies();
    } catch (error) {
      console.log("Error deleting family:", error);
      toast.error("Failed to delete family");
    }
  };

  const handleViewFamily = (family: Family) => {
    setSelectedFamily(family);
    openModal();
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "success";
      case "Deceased":
        return "error";
      case "Disabled":
        return "warning";
      default:
        return "info";
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`flex items-center justify-center w-10 h-10 rounded-md border ${
            currentPage === i
              ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 dark:border-primary-800"
              : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Families" />
      <div className="space-y-6">
        <ComponentCard title="Families Management">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 border-b border-gray-100 dark:border-white/[0.05] gap-4">
              {/* Search */}
              <div className="relative w-full lg:w-64">
                <input
                  type="text"
                  placeholder="Search families..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              {/* Add Button */}
              <Link
                href="/families/create"
                className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors dark:bg-primary-800 dark:hover:bg-primary-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Family
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              </div>
            ) : (
              <>
                <div className="max-w-full overflow-x-auto">
                  <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] whitespace-nowrap">
                      <TableRow>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          Guardian
                        </TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          City
                        </TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          Father Status
                        </TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          Mother Status
                        </TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          Children
                        </TableCell>
                        <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                      {families.length > 0 ? (
                        families.map((family) => (
                          <TableRow key={family._id}>
                            <TableCell className="px-5 py-4 sm:px-6 text-start">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/20">
                                  <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div>
                                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {family.guardian}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(family.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {family.city}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                              <Badge
                                color={getStatusColor(family.fatherStatus)}
                                size="sm"
                              >
                                {family.fatherStatus}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                              <Badge
                                color={getStatusColor(family.motherStatus)}
                                size="sm"
                              >
                                {family.motherStatus}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                              <div className="text-gray-800 text-theme-sm dark:text-white/90">
                                <span className="font-medium">{family.children.length}</span>
                                <span className="text-gray-500 dark:text-gray-400"> / {family.totalChildren}</span>
                                <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">with us</span>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleViewFamily(family)}
                                  className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <Link
                                  href={`/families/edit/${family._id}`}
                                  className="p-1.5 rounded-md text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Link>
                                <button
                                  onClick={() => handleDeleteFamily(family._id)}
                                  className="p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                            No families found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-white/[0.05]">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {totalEntries > 0 ? (
                      <>
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(currentPage * itemsPerPage, totalEntries)} of{" "}
                        {totalEntries} entries
                      </>
                    ) : (
                      "No entries to show"
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1 || totalPages === 0}
                      className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    {totalPages > 0 && renderPaginationButtons()}

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </ComponentCard>
      </div>

      {/* View Family Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-2xl">
        {selectedFamily && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Family Details
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Guardian</p>
                <p className="font-medium text-gray-800 dark:text-white">{selectedFamily.guardian}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">City</p>
                <p className="font-medium text-gray-800 dark:text-white">{selectedFamily.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Father Status</p>
                <Badge color={getStatusColor(selectedFamily.fatherStatus)} size="sm">
                  {selectedFamily.fatherStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mother Status</p>
                <Badge color={getStatusColor(selectedFamily.motherStatus)} size="sm">
                  {selectedFamily.motherStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Children</p>
                <p className="font-medium text-gray-800 dark:text-white">{selectedFamily.totalChildren}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Children With Us</p>
                <p className="font-medium text-gray-800 dark:text-white">{selectedFamily.children.length}</p>
              </div>
            </div>

            {selectedFamily.children.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Children</h3>
                <div className="space-y-3">
                  {selectedFamily.children.map((child, index) => (
                    <div key={child._id || index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{child.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Age: {calculateAge(child.dateOfBirth)} years
                          </p>
                        </div>
                      </div>
                      {child.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{child.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFamily.note && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Note</h3>
                <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  {selectedFamily.note}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Families;
