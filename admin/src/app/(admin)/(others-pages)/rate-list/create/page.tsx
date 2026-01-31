"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const defaultCategories = ["Food", "Education", "Medical", "Accessories"];

const CreateRateListItem = () => {
  const router = useRouter();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    newCategory: "",
    itemName: "",
    description: "",
    price: "",
    unit: "per item",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const category = isNewCategory ? formData.newCategory : formData.category;

    if (!category || !formData.itemName || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rate-list`,
        {
          category,
          itemName: formData.itemName,
          description: formData.description,
          price: parseFloat(formData.price),
          unit: formData.unit,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Rate list item created successfully");
      router.push("/rate-list");
    } catch (error) {
      console.log("Error creating item:", error);
      toast.error("Failed to create item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Rate List Item" />
      <div className="space-y-6">
        <ComponentCard title="Create New Item">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Selection */}
              <div>
                <Label htmlFor="category">Category *</Label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="newCategory"
                    checked={isNewCategory}
                    onChange={(e) => setIsNewCategory(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="newCategory" className="text-sm text-gray-600 dark:text-gray-400">
                    Add new category
                  </label>
                </div>
                {isNewCategory ? (
                  <InputField
                    name="newCategory"
                    placeholder="Enter new category name"
                    value={formData.newCategory}
                    onChange={handleChange}
                  />
                ) : (
                  <Select
                    options={defaultCategories.map((cat) => ({ label: cat, value: cat }))}
                    value={formData.category}
                    onChange={handleSelectChange("category")}
                    placeholder="Select category"
                  />
                )}
              </div>

              {/* Item Name */}
              <div>
                <Label htmlFor="itemName">Item Name *</Label>
                <InputField
                  name="itemName"
                  placeholder="e.g., Biryani, School Books, Medicine"
                  value={formData.itemName}
                  onChange={handleChange}
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price">Price (PKR) *</Label>
                <InputField
                  type="number"
                  name="price"
                  placeholder="e.g., 500"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              {/* Unit */}
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select
                  options={[
                    { label: "Per Item", value: "per item" },
                    { label: "Per Meal", value: "per meal" },
                    { label: "Per Month", value: "per month" },
                    { label: "Per Year", value: "per year" },
                    { label: "Per Visit", value: "per visit" },
                    { label: "Per Session", value: "per session" },
                  ]}
                  value={formData.unit}
                  onChange={handleSelectChange("unit")}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <TextArea
                placeholder="Brief description of the item..."
                value={formData.description}
                onChange={handleTextAreaChange("description")}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/rate-list")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Item"
                )}
              </Button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateRateListItem;
