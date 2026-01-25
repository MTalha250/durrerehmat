"use client";
import React, { useEffect, useState } from "react";
import { Heart, Baby } from "lucide-react";
import axios from "axios";
import useAuthStore from "@/store/authStore";

interface DashboardStats {
  familyCount: number;
  totalChildren: number;
}

export const Metrics = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const metrics = [
    {
      title: "Families",
      value: stats?.familyCount || 0,
      icon: Heart,
      bgColor: "bg-rose-100 dark:bg-rose-900/20",
      iconColor: "text-rose-600 dark:text-rose-400",
      description: "Registered families",
    },
    {
      title: "Children",
      value: stats?.totalChildren || 0,
      icon: Baby,
      bgColor: "bg-teal-100 dark:bg-teal-900/20",
      iconColor: "text-teal-600 dark:text-teal-400",
      description: "Children in our care",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="rounded-2xl space-y-4 border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] animate-pulse">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gray-200 rounded-xl dark:bg-gray-700"></div>
              <div className="w-4 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-20"></div>
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-16"></div>
              <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;

        return (
          <div key={index} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${metric.bgColor}`}>
                <Icon className={`${metric.iconColor}`} size={20} />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {metric.title}
              </h3>
              <div className="flex items-baseline space-x-1">
                <h4 className="font-bold text-gray-800 dark:text-white/90 text-2xl">
                  {metric.value}
                </h4>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {metric.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
