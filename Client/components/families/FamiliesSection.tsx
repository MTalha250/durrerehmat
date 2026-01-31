"use client";
import React, { useEffect, useState } from "react";
import FamilyGrid from "../grids/FamilyGrid";
import { ChevronLeft, ChevronRight, Users, Heart, MapPin } from "lucide-react";

const FamiliesSection = () => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [stats, setStats] = useState<FamilyStats | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchFamilies();
    fetchStats();
    fetchCities();
  }, [currentPage, selectedCity]);

  const fetchFamilies = async () => {
    try {
      setLoading(true);
      const cityParam = selectedCity ? `&city=${selectedCity}` : "";
      const res = await fetch(
        `${API_URL}/family/public?page=${currentPage}&limit=9${cityParam}`
      );
      const data = await res.json();
      setFamilies(data.families);
      setTotalPages(data.totalPages);
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

  const fetchCities = async () => {
    try {
      const res = await fetch(`${API_URL}/family/public/cities`);
      const data = await res.json();
      setCities(data.cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <div className="px-8 py-16 md:px-16 lg:px-24 xl:px-32">
      {/* Stats Section */}
      {stats && (
        <div className="bg-primary mb-12 grid grid-cols-1 gap-6 rounded-2xl p-8 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center text-white">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold lg:text-4xl">
              {stats.totalFamilies}
            </h2>
            <p className="mt-1 text-white/80">Families Supported</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold lg:text-4xl">
              {stats.totalChildren}
            </h2>
            <p className="mt-1 text-white/80">Children in Care</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <MapPin className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold lg:text-4xl">
              {stats.totalCities}
            </h2>
            <p className="mt-1 text-white/80">Cities Reached</p>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="mb-8">
        <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          OUR FAMILIES{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-blueish text-2xl font-bold sm:text-3xl md:text-4xl">
            Families We Support
          </h1>

          {/* City Filter */}
          {cities.length > 0 && (
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setCurrentPage(1);
              }}
              className="border-primary/30 focus:border-primary rounded-lg border bg-white px-4 py-2 text-gray-700 outline-none"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
        </div>
        <p className="mt-4 max-w-2xl text-gray-500">
          Meet the families who have entrusted their daughters to our care. Each
          family has a unique story, and together we are building a brighter
          future for these children.
        </p>
      </div>

      {/* Families Grid */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      ) : families.length > 0 ? (
        <FamilyGrid families={families} />
      ) : (
        <div className="flex min-h-[200px] items-center justify-center text-gray-500">
          No families found.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-primary text-primary hover:bg-primary flex items-center gap-1 rounded-lg border px-4 py-2 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="border-primary text-primary hover:bg-primary flex items-center gap-1 rounded-lg border px-4 py-2 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FamiliesSection;
