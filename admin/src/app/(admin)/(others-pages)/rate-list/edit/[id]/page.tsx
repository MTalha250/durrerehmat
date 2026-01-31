"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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

const EditRateListItem = () => {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    description: "",
    price: "",
    unit: "per item",
    isActive: true,
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/rate-list/${params.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const item = response.data.item;
        setFormData({
          category: item.category,
          itemName: item.itemName,
          description: item.description || "",
          price: item.price.toString(),
          unit: item.unit,
          isActive: item.isActive,
        });
      } catch (error) {
        console.log("Error fetching item:", error);
        toast.error("Failed to fetch item");
        router.push("/rate-list");
      } finally {
        setFetching(false);
      }
    };

    if (token && params.id) {
      fetchItem();
    }
  }, [token, params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.itemName || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/rate-list/${params.id}`,
        {
          category: formData.category,
          itemName: formData.itemName,
          description: formData.description,
          price: parseFloat(formData.price),
          unit: formData.unit,
          isActive: formData.isActive,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Item updated successfully");
      router.push("/rate-list");
    } catch (error) {
      console.log("Error updating item:", error);
      toast.error("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Rate List Item" />
      <div className="space-y-6">
        <ComponentCard title="Update Item">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <Label htmlFor="category">Category *</Label>
                <InputField
                  name="category"
                  placeholder="Category name"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              {/* Item Name */}
              <div>
                <Label htmlFor="itemName">Item Name *</Label>
                <InputField
                  name="itemName"
                  placeholder="e.g., Biryani, School Books"
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
                placeholder="Brief description..."
                value={formData.description}
                onChange={handleTextAreaChange("description")}
                rows={3}
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="rounded"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
                Active (visible in sponsorship form)
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/rate-list")}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Item"
                )}
              </Button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </>
  );
};

export default EditRateListItem;
