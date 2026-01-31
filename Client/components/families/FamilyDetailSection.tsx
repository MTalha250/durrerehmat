"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Users,
  Calendar,
  ArrowLeft,
  Sparkles,
  User,
  Gift,
  Home,
  UserCheck,
  Baby,
} from "lucide-react";
import SponsorModal from "../modals/SponsorModal";

interface FamilyDetailSectionProps {
  family: Family;
}

const FamilyDetailSection = ({ family }: FamilyDetailSectionProps) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "from-green-500 to-emerald-500 text-white";
      case "Deceased":
        return "from-gray-500 to-slate-500 text-white";
      case "Disabled":
        return "from-orange-500 to-amber-500 text-white";
      default:
        return "from-gray-400 to-gray-500 text-white";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "bg-green-50 border-green-200";
      case "Deceased":
        return "bg-gray-50 border-gray-200";
      case "Disabled":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Back Button */}
        <Link
          href="/families"
          className="mb-6 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to All Families</span>
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Family Header Card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Home className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <div className="text-white">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {family.guardian}&apos;s Family
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-white/90">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {family.city}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {family.children.length} children in our care
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent Status */}
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <div
                  className={`flex items-center gap-4 rounded-xl border-2 p-4 ${getStatusBgColor(family.fatherStatus)}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${getStatusColor(family.fatherStatus)} shadow-lg`}
                  >
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Father&apos;s Status</p>
                    <p className="text-lg font-bold text-gray-800">
                      {family.fatherStatus}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-4 rounded-xl border-2 p-4 ${getStatusBgColor(family.motherStatus)}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${getStatusColor(family.motherStatus)} shadow-lg`}
                  >
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mother&apos;s Status</p>
                    <p className="text-lg font-bold text-gray-800">
                      {family.motherStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Children Section */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="border-b border-gray-100 bg-gradient-to-r from-secondary/10 to-primary/10 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/80 text-white shadow-lg">
                    <Baby className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Children in Our Care
                    </h2>
                    <p className="text-sm text-gray-600">
                      {family.children.length} of {family.totalChildren} total
                      children
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                {family.children.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {family.children.map((child, index) => (
                      <div
                        key={child._id || index}
                        className="group relative overflow-hidden rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-lg font-bold text-primary transition-colors group-hover:from-primary group-hover:to-primary/80 group-hover:text-white">
                            {child.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800">
                              {child.name}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                                {calculateAge(child.dateOfBirth)} years old
                              </span>
                              <span className="hidden sm:inline text-gray-300">
                                |
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatDate(child.dateOfBirth)}
                              </span>
                            </div>
                            {child.description && (
                              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                {child.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="mt-4 text-gray-500">
                      No children currently registered in our care
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sponsor CTA Card */}
            <div className="sticky top-6 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-6 text-white shadow-xl shadow-primary/20">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">Sponsor This Family</h3>
              <p className="mt-2 text-sm text-white/90">
                Your support can transform lives. Help provide education, food,
                healthcare, and a brighter future for these children.
              </p>
              <button
                onClick={() => setIsSponsorModalOpen(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-primary shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
              >
                <Gift className="h-5 w-5" />
                Sponsor Now
              </button>
            </div>

            {/* Family Stats Card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="border-b border-gray-100 p-5">
                <h3 className="font-bold text-gray-800">Family Information</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-500">Guardian</span>
                  <span className="font-semibold text-gray-800">
                    {family.guardian}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-500">Location</span>
                  <span className="font-semibold text-gray-800">
                    {family.city}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-500">Total Children</span>
                  <span className="font-semibold text-gray-800">
                    {family.totalChildren}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-500">In Our Care</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {family.children.length} children
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-500">Registered</span>
                  <span className="font-semibold text-gray-800">
                    {formatDate(family.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white p-5 shadow-lg">
              <h3 className="mb-4 font-bold text-gray-800">Other Ways to Help</h3>
              <div className="space-y-3">
                <Link
                  href="/donate"
                  className="flex items-center gap-3 rounded-xl border-2 border-gray-100 p-3 transition-all hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Make a Donation</p>
                    <p className="text-xs text-gray-500">One-time or monthly</p>
                  </div>
                </Link>
                <Link
                  href="/services"
                  className="flex items-center gap-3 rounded-xl border-2 border-gray-100 p-3 transition-all hover:border-secondary/30 hover:bg-secondary/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-secondary/80 text-white">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Volunteer</p>
                    <p className="text-xs text-gray-500">Join our team</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Modal */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />
    </section>
  );
};

export default FamilyDetailSection;
