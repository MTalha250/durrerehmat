"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { ArrowLeft, Plus, X, User } from "lucide-react";
import Link from "next/link";
import { Child } from "@/types";

const statusOptions = [
  { value: "Alive", label: "Alive" },
  { value: "Deceased", label: "Deceased" },
  { value: "Disabled", label: "Disabled" },
  { value: "Unknown", label: "Unknown" },
];

const EditFamily = () => {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuthStore();
  const familyId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fatherStatus: "Unknown" as "Alive" | "Deceased" | "Disabled" | "Unknown",
    motherStatus: "Unknown" as "Alive" | "Deceased" | "Disabled" | "Unknown",
    guardian: "",
    totalChildren: 0,
    city: "",
    note: "",
  });

  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/family/${familyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const family = response.data.family;

        setFormData({
          fatherStatus: family.fatherStatus || "Unknown",
          motherStatus: family.motherStatus || "Unknown",
          guardian: family.guardian || "",
          totalChildren: family.totalChildren || 0,
          city: family.city || "",
          note: family.note || "",
        });

        // Format date for input field
        const formattedChildren = (family.children || []).map((child: Child) => ({
          ...child,
          dateOfBirth: child.dateOfBirth
            ? new Date(child.dateOfBirth).toISOString().split("T")[0]
            : "",
        }));
        setChildren(formattedChildren);
      } catch (error) {
        console.error("Error fetching family:", error);
        toast.error("Failed to load family data");
        router.push("/families");
      } finally {
        setLoading(false);
      }
    };

    if (familyId && token) {
      fetchFamily();
    }
  }, [familyId, token, router]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddChild = () => {
    setChildren([
      ...children,
      {
        name: "",
        dateOfBirth: "",
        description: "",
      },
    ]);
  };

  const handleRemoveChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const handleChildChange = (index: number, field: keyof Child, value: string) => {
    const updatedChildren = [...children];
    updatedChildren[index] = {
      ...updatedChildren[index],
      [field]: value,
    };
    setChildren(updatedChildren);
  };

  const validateForm = (): boolean => {
    if (!formData.guardian.trim()) {
      toast.error("Guardian name is required");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("City is required");
      return false;
    }
    if (formData.totalChildren < 0) {
      toast.error("Total children cannot be negative");
      return false;
    }
    if (children.length > formData.totalChildren) {
      toast.error("Children with us cannot exceed total children");
      return false;
    }

    for (let i = 0; i < children.length; i++) {
      if (!children[i].name.trim()) {
        toast.error(`Child ${i + 1} name is required`);
        return false;
      }
      if (!children[i].dateOfBirth) {
        toast.error(`Child ${i + 1} date of birth is required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      const familyData = {
        ...formData,
        children,
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/family/${familyId}`,
        familyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Family updated successfully!");
      router.push("/families");
    } catch (error: any) {
      console.error("Error updating family:", error);
      toast.error(error.response?.data?.message || "Failed to update family");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading family...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Family" />
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/families"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Families
          </Link>
        </div>

        <ComponentCard title="Edit Family Information">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Parent Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Father Status *</Label>
                <Select
                  options={statusOptions}
                  placeholder="Select status"
                  onChange={(value) => handleInputChange("fatherStatus", value)}
                  defaultValue={formData.fatherStatus}
                />
              </div>

              <div>
                <Label>Mother Status *</Label>
                <Select
                  options={statusOptions}
                  placeholder="Select status"
                  onChange={(value) => handleInputChange("motherStatus", value)}
                  defaultValue={formData.motherStatus}
                />
              </div>
            </div>

            {/* Guardian and City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Guardian Name *</Label>
                <Input
                  type="text"
                  placeholder="Enter guardian name"
                  value={formData.guardian}
                  onChange={(e) => handleInputChange("guardian", e.target.value)}
                />
              </div>

              <div>
                <Label>City *</Label>
                <Input
                  type="text"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
            </div>

            {/* Total Children */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Total Children in Family *</Label>
                <Input
                  type="number"
                  placeholder="Enter total children"
                  value={formData.totalChildren.toString()}
                  onChange={(e) => handleInputChange("totalChildren", parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Children Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Children With Us
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add details of children currently in orphanage care
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddChild}
                  className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors dark:bg-primary-800 dark:hover:bg-primary-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Child
                </button>
              </div>

              {children.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">No children added yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Click "Add Child" to add children details
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {children.map((child, index) => (
                    <div
                      key={child._id || index}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg relative"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveChild(index)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Child {index + 1}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Name *</Label>
                          <Input
                            type="text"
                            placeholder="Enter child name"
                            value={child.name}
                            onChange={(e) => handleChildChange(index, "name", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label>Date of Birth *</Label>
                          <Input
                            type="date"
                            value={child.dateOfBirth}
                            onChange={(e) => handleChildChange(index, "dateOfBirth", e.target.value)}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label>Description</Label>
                          <TextArea
                            placeholder="Enter any additional details about the child"
                            value={child.description}
                            onChange={(value) => handleChildChange(index, "description", value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Note */}
            <div>
              <Label>Note for Family</Label>
              <TextArea
                placeholder="Enter any additional notes about the family"
                value={formData.note}
                onChange={(value) => handleInputChange("note", value)}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors dark:bg-primary-800 dark:text-white dark:hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Updating..." : "Update Family"}
              </button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </>
  );
};

export default EditFamily;
