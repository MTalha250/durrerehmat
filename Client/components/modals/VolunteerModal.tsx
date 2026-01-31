"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import {
  Loader2,
  CheckCircle,
  Users,
  Sparkles,
  GraduationCap,
  Stethoscope,
  ClipboardList,
  PartyPopper,
  Megaphone,
  Heart,
  HelpCircle,
  User,
  Mail,
  Phone,
  Home,
  Briefcase,
  Calendar,
  MessageSquare,
} from "lucide-react";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const volunteerTypeData = [
  {
    type: "Teaching",
    Icon: GraduationCap,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50 border-blue-200",
    description: "Help educate children",
  },
  {
    type: "Healthcare",
    Icon: Stethoscope,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 border-rose-200",
    description: "Medical support & care",
  },
  {
    type: "Administrative",
    Icon: ClipboardList,
    color: "from-gray-500 to-slate-500",
    bgColor: "bg-gray-50 border-gray-200",
    description: "Office & management",
  },
  {
    type: "Event Management",
    Icon: PartyPopper,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50 border-purple-200",
    description: "Organize events",
  },
  {
    type: "Fundraising",
    Icon: Megaphone,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 border-amber-200",
    description: "Help raise funds",
  },
  {
    type: "Mentorship",
    Icon: Heart,
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50 border-teal-200",
    description: "Guide & support",
  },
  {
    type: "Other",
    Icon: HelpCircle,
    color: "from-cyan-500 to-sky-500",
    bgColor: "bg-cyan-50 border-cyan-200",
    description: "Other ways to help",
  },
];

const VolunteerModal = ({ isOpen, onClose }: VolunteerModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    profession: "",
    gender: "",
    age: "",
    volunteerType: "",
    reasonForInterest: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/volunteer/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            age: parseInt(formData.age),
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            address: "",
            profession: "",
            gender: "",
            age: "",
            volunteerType: "",
            reasonForInterest: "",
          });
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Thank You!"
        icon={<Users className="h-5 w-5 sm:h-6 sm:w-6" />}
      >
        <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-25" />
            <div className="relative flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
              <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
            </div>
          </div>
          <h3 className="mb-2 sm:mb-3 mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-gray-800">
            Application Submitted!
          </h3>
          <p className="max-w-sm text-sm sm:text-base text-gray-600 px-4">
            Thank you for your interest in volunteering. Our team will contact
            you shortly.
          </p>
          <div className="mt-4 sm:mt-6 flex items-center gap-2 rounded-full bg-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-secondary">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Welcome to the team!
          </div>
        </div>
      </Modal>
    );
  }

  const selectedTypeData = volunteerTypeData.find(
    (v) => v.type === formData.volunteerType
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Become a Volunteer"
      icon={<Users className="h-6 w-6" />}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Volunteer Type Selection */}
        <div>
          <div className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 p-3 sm:p-4">
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
              How would you like to help?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Choose the type of volunteering that matches your skills
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {volunteerTypeData.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, volunteerType: item.type })
                }
                className={`group relative flex flex-col items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border-2 p-2.5 sm:p-4 transition-all duration-300 ${
                  formData.volunteerType === item.type
                    ? `${item.bgColor} shadow-lg`
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div
                  className={`flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg transition-transform group-hover:scale-110`}
                >
                  <item.Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight">
                  {item.type}
                </span>
                <span className="text-center text-[10px] sm:text-xs text-gray-500 leading-tight hidden sm:block">
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <div className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 p-3 sm:p-4">
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Your Information
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Tell us a bit about yourself
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
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/10"
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
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/10"
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
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/10"
                placeholder="+92 300 1234567"
              />
            </div>
            <div className="group">
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                Profession *
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/10"
                placeholder="Your profession"
              />
            </div>
            <div className="group">
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/10"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="group">
              <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="16"
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/10"
                placeholder="Your age"
              />
            </div>
          </div>

          <div className="mt-3 sm:mt-4 group">
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
              className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/10"
              placeholder="Your complete address"
            />
          </div>
        </div>

        {/* Motivation */}
        <div>
          <div className="group">
            <label className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-700">
              <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
              Why do you want to volunteer? *
            </label>
            <div className="relative">
              <textarea
                name="reasonForInterest"
                value={formData.reasonForInterest}
                onChange={handleChange}
                required
                rows={3}
                className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition-all focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/10"
                placeholder="Share your motivation..."
              />
              <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-[10px] sm:text-xs text-gray-400">
                {formData.reasonForInterest.length}/500
              </div>
            </div>
          </div>
        </div>

        {/* Selected Type Summary */}
        {selectedTypeData && (
          <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
            <div className="flex items-center gap-2.5 sm:gap-3 border-b border-gray-100 bg-white px-3 sm:px-5 py-2.5 sm:py-3">
              <div
                className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br ${selectedTypeData.color} text-white`}
              >
                <selectedTypeData.Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500">Volunteering as</p>
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {selectedTypeData.type}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.volunteerType}
          className="group relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-r from-secondary to-secondary/90 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-secondary/30 transition-all hover:shadow-xl hover:shadow-secondary/40 disabled:opacity-50 disabled:shadow-none"
        >
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Submit Application
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

export default VolunteerModal;
