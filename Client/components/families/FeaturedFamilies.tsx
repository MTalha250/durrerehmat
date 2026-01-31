"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRightIcon, Users, Heart, MapPin } from "lucide-react";
import FamilyCard from "../cards/FamilyCard";

const FeaturedFamilies = () => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [stats, setStats] = useState<FamilyStats | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchFamilies();
    fetchStats();
  }, []);

  const fetchFamilies = async () => {
    try {
      const res = await fetch(`${API_URL}/family/public?limit=3`);
      const data = await res.json();
      setFamilies(data.families);
    } catch (error) {
      console.error("Error fetching families:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/family/public/stats`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="bg-[#F6F4F3] px-8 py-16 md:px-16 lg:px-24 xl:px-32">
      {/* Section Header */}
      <div className="mb-8">
        <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          OUR FAMILIES{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-blueish text-2xl font-bold sm:text-3xl md:text-4xl">
              Families We Support
            </h1>
            <p className="mt-4 max-w-xl text-gray-500">
              Meet some of the families who have entrusted their daughters to
              our care. Together, we are building brighter futures.
            </p>
          </div>
          <Link
            href="/families"
            className="bg-primary group flex w-fit items-center gap-1 rounded px-4 py-2 font-semibold text-white"
          >
            View All Families
            <ChevronRightIcon
              size={20}
              strokeWidth={2}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      {stats && (
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <Heart className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalFamilies}
              </p>
              <p className="text-sm text-gray-500">Families Supported</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <Users className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalChildren}
              </p>
              <p className="text-sm text-gray-500">Children in Care</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <MapPin className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalCities}
              </p>
              <p className="text-sm text-gray-500">Cities Reached</p>
            </div>
          </div>
        </div>
      )}

      {/* Featured Families */}
      {loading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      ) : families.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {families.map((family) => (
            <FamilyCard key={family._id} family={family} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center text-gray-500">
          No families to display yet.
        </div>
      )}
    </div>
  );
};

export default FeaturedFamilies;
