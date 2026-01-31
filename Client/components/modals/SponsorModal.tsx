"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import {
  Loader2,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Heart,
  Sparkles,
  User,
  MapPin,
  Calendar,
  BookOpen,
  Utensils,
  Stethoscope,
  Shirt,
  Check,
  Mail,
  Phone,
  Home,
  Briefcase,
  Users,
} from "lucide-react";

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AvailableChild {
  familyId: string;
  childId: string;
  childName: string;
  dateOfBirth: string;
  description: string;
  city: string;
  guardian: string;
  sponsorshipStatus: string;
  sponsoredCategories: string[];
}

interface RateItem {
  _id: string;
  category: string;
  itemName: string;
  description: string;
  price: number;
  unit: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Food: <Utensils className="h-5 w-5" />,
  Education: <BookOpen className="h-5 w-5" />,
  Medical: <Stethoscope className="h-5 w-5" />,
  Accessories: <Shirt className="h-5 w-5" />,
};

const categoryColors: Record<string, string> = {
  Food: "from-orange-500 to-amber-500",
  Education: "from-blue-500 to-indigo-500",
  Medical: "from-rose-500 to-pink-500",
  Accessories: "from-purple-500 to-violet-500",
};

const categoryBgColors: Record<string, string> = {
  Food: "bg-orange-50 border-orange-200 hover:border-orange-400",
  Education: "bg-blue-50 border-blue-200 hover:border-blue-400",
  Medical: "bg-rose-50 border-rose-200 hover:border-rose-400",
  Accessories: "bg-purple-50 border-purple-200 hover:border-purple-400",
};

const SponsorModal = ({ isOpen, onClose }: SponsorModalProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [children, setChildren] = useState<AvailableChild[]>([]);
  const [rateList, setRateList] = useState<Record<string, RateItem[]>>({});
  const [selectedChild, setSelectedChild] = useState<AvailableChild | null>(
    null,
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    profession: "",
    gender: "",
    age: "",
    sponsorshipType: "",
    partialCategories: [] as string[],
    selectedItems: [] as RateItem[],
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (isOpen) {
      fetchChildren();
      fetchRateList();
    }
  }, [isOpen]);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/sponsorship/available-children`);
      const data = await res.json();
      setChildren(data.children || []);
    } catch (error) {
      console.error("Error fetching children:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRateList = async () => {
    try {
      const res = await fetch(`${API_URL}/rate-list/public`);
      const data = await res.json();
      setRateList(data.rateList || {});
    } catch (error) {
      console.error("Error fetching rate list:", error);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryToggle = (category: string) => {
    const current = formData.partialCategories;
    if (current.includes(category)) {
      setFormData({
        ...formData,
        partialCategories: current.filter((c) => c !== category),
        selectedItems: formData.selectedItems.filter(
          (i) => i.category !== category,
        ),
      });
    } else {
      setFormData({
        ...formData,
        partialCategories: [...current, category],
      });
    }
  };

  const handleItemToggle = (item: RateItem) => {
    const current = formData.selectedItems;
    const exists = current.find((i) => i._id === item._id);
    if (exists) {
      setFormData({
        ...formData,
        selectedItems: current.filter((i) => i._id !== item._id),
      });
    } else {
      setFormData({
        ...formData,
        selectedItems: [...current, item],
      });
    }
  };

  const calculateTotal = () => {
    return formData.selectedItems.reduce((sum, item) => sum + item.price, 0);
  };

  const handleSubmit = async () => {
    if (!selectedChild) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/sponsorship/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          profession: formData.profession,
          gender: formData.gender,
          age: parseInt(formData.age),
          familyId: selectedChild.familyId,
          childId: selectedChild.childId,
          childName: selectedChild.childName,
          sponsorshipType: formData.sponsorshipType,
          partialCategories: formData.partialCategories,
          selectedItems: formData.selectedItems.map((item) => ({
            itemId: item._id,
            itemName: item.itemName,
            category: item.category,
            price: item.price,
            unit: item.unit,
          })),
          totalAmount: calculateTotal(),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          resetForm();
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSuccess(false);
    setSelectedChild(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      profession: "",
      gender: "",
      age: "",
      sponsorshipType: "",
      partialCategories: [],
      selectedItems: [],
    });
  };

  if (success) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Thank You!"
        icon={<Heart className="h-6 w-6" />}
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-25" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h3 className="mt-6 mb-3 text-2xl font-bold text-gray-800">
            Sponsorship Request Submitted!
          </h3>
          <p className="max-w-sm text-gray-600">
            Thank you for your incredible kindness. Our team will contact you
            shortly to complete the process.
          </p>
          <div className="bg-primary/10 text-primary mt-6 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            You&apos;re making a difference!
          </div>
        </div>
      </Modal>
    );
  }

  const availableCategories = [
    "Food",
    "Education",
    "Medical",
    "Accessories",
  ].filter((cat) => !selectedChild?.sponsoredCategories?.includes(cat));

  const stepLabels = ["Select Child", "Sponsorship", "Your Info"];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sponsor a Daughter"
      icon={<Heart className="h-6 w-6" />}
      size="lg"
    >
      {/* Progress Steps */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-1 items-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold shadow-lg transition-all duration-300 ${
                    step >= s
                      ? "from-primary to-primary/80 shadow-primary/30 bg-gradient-to-br text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    step >= s ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {stepLabels[s - 1]}
                </span>
              </div>
              {s < 3 && (
                <div className="mx-2 h-1 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`from-primary to-primary/80 h-full bg-gradient-to-r transition-all duration-500 ${
                      step > s ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Child */}
      {step === 1 && (
        <div className="animate-fadeIn flex flex-col">
          {/* Scrollable content */}
          <div className="max-h-[50vh] overflow-y-auto pr-2">
            <div className="from-primary/10 to-secondary/10 mb-4 rounded-2xl bg-gradient-to-r p-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <User className="text-primary h-5 w-5" />
                Select a child to sponsor
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Choose a child whose life you&apos;d like to transform
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="border-primary/20 border-t-primary h-16 w-16 animate-spin rounded-full border-4" />
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Loading children...
                </p>
              </div>
            ) : children.length > 0 ? (
              <div className="grid gap-3">
                {children.map((child, index) => (
                  <div
                    key={`${child.familyId}-${child.childId}`}
                    onClick={() => setSelectedChild(child)}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-4 transition-all duration-300 ${
                      selectedChild?.childId === child.childId
                        ? "border-primary from-primary/5 to-primary/10 shadow-primary/10 bg-gradient-to-r shadow-lg"
                        : "hover:border-primary/30 border-gray-100 bg-white hover:shadow-md"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold transition-colors ${
                          selectedChild?.childId === child.childId
                            ? "from-primary to-primary/80 bg-gradient-to-br text-white"
                            : "group-hover:bg-primary/10 group-hover:text-primary bg-gray-100 text-gray-500"
                        }`}
                      >
                        {child.childName.charAt(0)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-gray-800">
                              {child.childName}
                            </h4>
                            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {calculateAge(child.dateOfBirth)} years
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {child.city}
                              </span>
                            </div>
                          </div>
                          {child.sponsorshipStatus === "partial" && (
                            <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1 text-xs font-medium text-white shadow-sm">
                              Partially Sponsored
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-gray-400">
                          Guardian: {child.guardian}
                        </p>

                        {child.description && (
                          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                            {child.description}
                          </p>
                        )}
                      </div>

                      {/* Selection indicator */}
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all ${
                          selectedChild?.childId === child.childId
                            ? "bg-primary text-white"
                            : "border-2 border-gray-200"
                        }`}
                      >
                        {selectedChild?.childId === child.childId && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <p className="mt-4 text-gray-500">
                  No children available for sponsorship at the moment.
                </p>
              </div>
            )}
          </div>

          {/* Fixed button area */}
          <div className="mt-6 flex shrink-0 justify-end border-t border-gray-100 pt-6">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedChild}
              className="group from-primary to-primary/90 shadow-primary/30 hover:shadow-primary/40 flex items-center gap-2 rounded-xl bg-gradient-to-r px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:shadow-none"
            >
              Continue
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Sponsorship Details */}
      {step === 2 && (
        <div className="animate-fadeIn flex flex-col">
          {/* Scrollable content */}
          <div className="max-h-[50vh] overflow-y-auto pr-2">
            {/* Selected child info */}
            <div className="from-primary/10 to-secondary/10 mb-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r p-4">
              <div className="from-primary to-primary/80 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white">
                {selectedChild?.childName.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Sponsoring</p>
                <p className="font-bold text-gray-800">
                  {selectedChild?.childName}
                </p>
              </div>
            </div>

            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Choose Sponsorship Type
            </h3>

            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              {/* Comprehensive */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    sponsorshipType: "Comprehensive",
                    partialCategories: [],
                    selectedItems: [],
                  })
                }
                className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
                  formData.sponsorshipType === "Comprehensive"
                    ? "border-primary from-primary/5 to-primary/10 bg-gradient-to-br shadow-lg"
                    : "hover:border-primary/30 border-gray-100 hover:shadow-md"
                }`}
              >
                <div className="bg-primary/10 absolute -top-8 -right-8 h-24 w-24 rounded-full transition-transform group-hover:scale-150" />
                <div className="relative">
                  <div
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${
                      formData.sponsorshipType === "Comprehensive"
                        ? "from-primary to-primary/80 shadow-primary/30 bg-gradient-to-br text-white shadow-lg"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">
                    Comprehensive
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Full sponsorship covering all needs
                  </p>
                </div>
              </button>

              {/* Partial */}
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, sponsorshipType: "Partial" })
                }
                className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
                  formData.sponsorshipType === "Partial"
                    ? "border-secondary from-secondary/5 to-secondary/10 bg-gradient-to-br shadow-lg"
                    : "hover:border-secondary/30 border-gray-100 hover:shadow-md"
                }`}
              >
                <div className="bg-secondary/10 absolute -top-8 -right-8 h-24 w-24 rounded-full transition-transform group-hover:scale-150" />
                <div className="relative">
                  <div
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${
                      formData.sponsorshipType === "Partial"
                        ? "from-secondary to-secondary/80 shadow-secondary/30 bg-gradient-to-br text-white shadow-lg"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Heart className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">Partial</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose specific categories to support
                  </p>
                </div>
              </button>
            </div>

            {formData.sponsorshipType === "Partial" && (
              <div className="animate-fadeIn">
                <h4 className="mb-3 font-semibold text-gray-800">
                  Select Categories
                </h4>
                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {availableCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryToggle(cat)}
                      className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                        formData.partialCategories.includes(cat)
                          ? `${categoryBgColors[cat]} border-2 shadow-md`
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${
                          categoryColors[cat]
                        } text-white ${
                          formData.partialCategories.includes(cat)
                            ? "shadow-lg"
                            : ""
                        }`}
                      >
                        {categoryIcons[cat]}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {cat}
                      </span>
                    </button>
                  ))}
                </div>

                {formData.partialCategories.length > 0 && (
                  <div className="max-h-[150px] space-y-4 overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                    {formData.partialCategories.map((category) => (
                      <div key={category}>
                        <div className="mb-2 flex items-center gap-2">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br ${categoryColors[category]} text-white`}
                          >
                            {categoryIcons[category]}
                          </div>
                          <h5 className="font-semibold text-gray-700">
                            {category}
                          </h5>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {(rateList[category] || []).map((item) => (
                            <label
                              key={item._id}
                              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 bg-white p-3 transition-all ${
                                formData.selectedItems.some(
                                  (i) => i._id === item._id,
                                )
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-transparent hover:border-gray-200"
                              }`}
                            >
                              <div
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                                  formData.selectedItems.some(
                                    (i) => i._id === item._id,
                                  )
                                    ? "border-primary bg-primary text-white"
                                    : "border-gray-300"
                                }`}
                              >
                                {formData.selectedItems.some(
                                  (i) => i._id === item._id,
                                ) && <Check className="h-3 w-3" />}
                              </div>
                              <input
                                type="checkbox"
                                checked={formData.selectedItems.some(
                                  (i) => i._id === item._id,
                                )}
                                onChange={() => handleItemToggle(item)}
                                className="sr-only"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">
                                  {item.itemName}
                                </p>
                              </div>
                              <span className="text-primary text-sm font-bold">
                                PKR {item.price.toLocaleString()}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {formData.selectedItems.length > 0 && (
                  <div className="from-primary to-primary/90 shadow-primary/30 mt-4 overflow-hidden rounded-2xl bg-gradient-to-r p-4 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Contribution</span>
                      <span className="text-2xl font-bold">
                        PKR {calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fixed button area */}
          <div className="mt-6 flex shrink-0 justify-between border-t border-gray-100 pt-6">
            <button
              onClick={() => setStep(1)}
              className="group flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!formData.sponsorshipType}
              className="group from-primary to-primary/90 shadow-primary/30 hover:shadow-primary/40 flex items-center gap-2 rounded-xl bg-gradient-to-r px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:shadow-none"
            >
              Continue
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Personal Info */}
      {step === 3 && (
        <div className="animate-fadeIn flex flex-col">
          {/* Scrollable content */}
          <div className="max-h-[50vh] overflow-y-auto pr-2">
            <div className="from-primary/10 to-secondary/10 mb-6 rounded-2xl bg-gradient-to-r p-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <User className="text-primary h-5 w-5" />
                Your Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Please provide your details to complete the sponsorship
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="group">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="h-4 w-4 text-gray-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:ring-4 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="group">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Mail className="h-4 w-4 text-gray-400" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:ring-4 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="group">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Phone className="h-4 w-4 text-gray-400" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:ring-4 focus:outline-none"
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div className="group">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    Profession *
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                    className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:ring-4 focus:outline-none"
                    placeholder="Your profession"
                  />
                </div>
                <div className="group">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Users className="h-4 w-4 text-gray-400" />
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:ring-4 focus:outline-none"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="group">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="18"
                    className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:ring-4 focus:outline-none"
                    placeholder="Your age"
                  />
                </div>
              </div>
              <div className="group">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Home className="h-4 w-4 text-gray-400" />
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="focus:border-primary focus:ring-primary/10 w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:ring-4 focus:outline-none"
                  placeholder="Your complete address"
                />
              </div>
            </div>

            {/* Summary Card */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
              <div className="border-b border-gray-100 bg-white px-5 py-3">
                <h4 className="font-semibold text-gray-800">
                  Sponsorship Summary
                </h4>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Child</span>
                  <span className="font-semibold text-gray-800">
                    {selectedChild?.childName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Type</span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      formData.sponsorshipType === "Comprehensive"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {formData.sponsorshipType}
                  </span>
                </div>
                {formData.sponsorshipType === "Partial" &&
                  formData.selectedItems.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="font-medium text-gray-700">Total</span>
                      <span className="text-primary text-xl font-bold">
                        PKR {calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Fixed button area */}
          <div className="mt-6 flex shrink-0 justify-between border-t border-gray-100 pt-6">
            <button
              onClick={() => setStep(2)}
              className="group flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                submitting ||
                !formData.fullName ||
                !formData.email ||
                !formData.phone ||
                !formData.address ||
                !formData.profession ||
                !formData.gender ||
                !formData.age
              }
              className="group from-primary to-primary/90 shadow-primary/30 hover:shadow-primary/40 flex items-center gap-2 rounded-xl bg-gradient-to-r px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:shadow-none"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5" />
                  Submit Sponsorship
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </Modal>
  );
};

export default SponsorModal;
