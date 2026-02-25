"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import {
  Loader2,
  CheckCircle,
  Gift,
  Sparkles,
  CreditCard,
  CalendarClock,
  Package,
  User,
  Mail,
  Phone,
  Home,
  Heart,
  Banknote,
  Check,
} from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const donationTypes = [
  {
    type: "One-time",
    Icon: CreditCard,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 border-emerald-200",
    description: "Make a single contribution",
  },
  {
    type: "Monthly",
    Icon: CalendarClock,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50 border-blue-200",
    description: "Recurring monthly donation",
  },
  {
    type: "In-kind",
    Icon: Package,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50 border-purple-200",
    description: "Donate goods & supplies",
  },
];

const suggestedAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    donationType: "",
    inKindDetails: "",
    amount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donation/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            amount: formData.amount ? parseFloat(formData.amount) : 0,
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            donationType: "",
            inKindDetails: "",
            amount: "",
          });
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedTypeData = donationTypes.find(
    (d) => d.type === formData.donationType
  );

  if (success) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Thank You!"
        icon={<Gift className="h-5 w-5 sm:h-6 sm:w-6" />}
      >
        <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-25" />
            <div className="relative flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
              <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
            </div>
          </div>
          <h3 className="mb-2 sm:mb-3 mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-gray-800">
            Thank You for Your Generosity!
          </h3>
          <p className="max-w-sm text-sm sm:text-base text-gray-600 px-4">
            Your kindness means the world to us. Our team will contact you
            shortly to complete your donation.
          </p>
          <div className="mt-4 sm:mt-6 flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Making dreams come true!
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Make a Donation"
      icon={<Gift className="h-6 w-6" />}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Donation Type Selection */}
        <div>
          <div className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 p-3 sm:p-4">
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Choose Your Donation Type
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Every contribution makes a difference
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
            {donationTypes.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    donationType: item.type,
                    inKindDetails: "",
                    amount: "",
                  })
                }
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 p-3 sm:p-5 text-center transition-all duration-300 ${
                  formData.donationType === item.type
                    ? `${item.bgColor} shadow-lg`
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-white/50 to-transparent opacity-50" />
                <div className="relative flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0">
                  <div
                    className={`flex h-10 w-10 sm:h-14 sm:w-14 sm:mx-auto sm:mb-3 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg transition-transform group-hover:scale-110`}
                  >
                    <item.Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-left sm:text-center">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800">
                      {item.type}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection for One-time or Monthly */}
        {(formData.donationType === "One-time" ||
          formData.donationType === "Monthly") && (
          <div className="animate-fadeIn">
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              <Banknote className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <span className="text-sm sm:text-base font-medium text-gray-700">
                Select or Enter Amount (PKR)
              </span>
            </div>

            <div className="mb-3 sm:mb-4 grid grid-cols-3 gap-2 sm:gap-3 sm:grid-cols-6">
              {suggestedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, amount: amount.toString() })
                  }
                  className={`rounded-lg sm:rounded-xl border-2 py-2 sm:py-3 text-center text-sm sm:text-base font-semibold transition-all ${
                    formData.amount === amount.toString()
                      ? "border-primary bg-primary/10 text-primary shadow-md"
                      : "border-gray-200 text-gray-600 hover:border-primary/50 hover:bg-gray-50"
                  }`}
                >
                  {amount >= 1000
                    ? `${amount / 1000}K`
                    : amount.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-sm sm:text-lg font-semibold text-gray-400">
                PKR
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0"
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 py-3 sm:py-4 pl-12 sm:pl-16 pr-3 sm:pr-4 text-lg sm:text-xl font-semibold transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="Custom amount"
              />
            </div>
          </div>
        )}

        {/* In-kind Details */}
        {formData.donationType === "In-kind" && (
          <div className="animate-fadeIn">
            <div className="group">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <Package className="h-4 w-4 text-gray-400" />
                What would you like to donate? *
              </label>
              <textarea
                name="inKindDetails"
                value={formData.inKindDetails}
                onChange={handleChange}
                required={formData.donationType === "In-kind"}
                rows={4}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="Describe the items you'd like to donate (e.g., clothes, books, food, school supplies, etc.)"
              />
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div>
          <div className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 p-3 sm:p-4">
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
              Your Information
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              So we can reach out to you
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            <div className="group">
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="Enter your full name"
              />
            </div>
            <div className="group">
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="your@email.com"
              />
            </div>
            <div className="group">
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="+92 300 1234567"
              />
            </div>
            <div className="group">
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="Your address"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        {selectedTypeData && (
          <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
            <div className="flex items-center justify-between border-b border-gray-100 bg-white px-3 sm:px-5 py-2.5 sm:py-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br ${selectedTypeData.color} text-white`}
                >
                  <selectedTypeData.Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Donation Type</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    {selectedTypeData.type}
                  </p>
                </div>
              </div>
              {formData.amount && (
                <div className="text-right">
                  <p className="text-[10px] sm:text-xs text-gray-500">Amount</p>
                  <p className="text-lg sm:text-xl font-bold text-primary">
                    PKR {parseInt(formData.amount).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.donationType}
          className="group relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-r from-primary to-primary/90 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50 disabled:shadow-none"
        >
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
                Submit Donation
              </>
            )}
          </span>
        </button>
      </form>

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

export default DonationModal;
