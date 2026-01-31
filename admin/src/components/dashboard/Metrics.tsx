"use client";
import React, { useEffect, useState } from "react";
import {
  Heart,
  Baby,
  Users,
  HandHeart,
  Gift,
  MapPin,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import useAuthStore from "@/store/authStore";

interface DashboardStats {
  familyCount: number;
  totalChildren: number;
  citiesCount: number;
  totalSponsorships: number;
  pendingSponsorships: number;
  activeSponsorships: number;
  totalVolunteers: number;
  pendingVolunteers: number;
  activeVolunteers: number;
  totalDonations: number;
  pendingDonations: number;
  totalDonationAmount: number;
}

export const Metrics = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardStats();
    }
  }, [token]);

  const mainMetrics = [
    {
      title: "Total Families",
      value: stats?.familyCount || 0,
      icon: Heart,
      bgColor: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
      borderColor: "border-rose-200 dark:border-rose-800/50",
      description: "Registered families",
    },
    {
      title: "Children in Care",
      value: stats?.totalChildren || 0,
      icon: Baby,
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
      iconColor: "text-teal-600 dark:text-teal-400",
      borderColor: "border-teal-200 dark:border-teal-800/50",
      description: "Under our support",
    },
    {
      title: "Active Sponsors",
      value: stats?.activeSponsorships || 0,
      icon: HandHeart,
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800/50",
      description: "Approved sponsorships",
    },
    {
      title: "Active Volunteers",
      value: stats?.activeVolunteers || 0,
      icon: Users,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800/50",
      description: "Approved volunteers",
    },
  ];

  const secondaryMetrics = [
    {
      title: "Cities Covered",
      value: stats?.citiesCount || 0,
      icon: MapPin,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Total Donations",
      value: stats?.totalDonations || 0,
      icon: Gift,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      title: "Donation Amount",
      value: `PKR ${(stats?.totalDonationAmount || 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      isAmount: true,
    },
  ];

  const pendingItems = [
    {
      title: "Pending Sponsorships",
      value: stats?.pendingSponsorships || 0,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Pending Volunteers",
      value: stats?.pendingVolunteers || 0,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Pending Donations",
      value: stats?.pendingDonations || 0,
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  const totalPending =
    (stats?.pendingSponsorships || 0) +
    (stats?.pendingVolunteers || 0) +
    (stats?.pendingDonations || 0);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Main metrics skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-7 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
        {/* Secondary metrics skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-5 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mainMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={`rounded-2xl border bg-white p-4 sm:p-6 transition-all duration-200 hover:shadow-lg dark:bg-white/[0.03] ${metric.borderColor}`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${metric.bgColor}`}
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${metric.iconColor}`} />
                </div>
              </div>

              <div className="mt-3 sm:mt-4 space-y-1">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                  {metric.title}
                </h3>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white/90">
                  {metric.value}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {secondaryMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-3 sm:gap-4 rounded-xl border border-gray-200 bg-white p-3 sm:p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]`}
            >
              <div
                className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg ${metric.bgColor}`}
              >
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${metric.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {metric.title}
                </p>
                <p
                  className={`text-base sm:text-lg font-bold text-gray-800 dark:text-white truncate ${
                    metric.isAmount ? "text-sm sm:text-base" : ""
                  }`}
                >
                  {metric.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pending Actions Card */}
      {totalPending > 0 && (
        <div className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-4 sm:p-6 dark:border-orange-800/50 dark:from-orange-900/20 dark:to-amber-900/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
                  Pending Actions
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {totalPending} items require your attention
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {pendingItems.map(
                (item, index) =>
                  item.value > 0 && (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm shadow-sm dark:bg-gray-800"
                    >
                      <span className="font-semibold text-orange-600 dark:text-orange-400">
                        {item.value}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.title.replace("Pending ", "")}
                      </span>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Total Sponsorships
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
              {stats?.totalSponsorships || 0}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Total Volunteers
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
              {stats?.totalVolunteers || 0}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Families Helped
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
              {stats?.familyCount || 0}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
              Cities Reached
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
              {stats?.citiesCount || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
