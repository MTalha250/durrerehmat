"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Hero from "@/components/common/Hero";
import FamilyDetailSection from "@/components/families/FamilyDetailSection";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const FamilyDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (params.id) {
      fetchFamily();
    }
  }, [params.id]);

  const fetchFamily = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`${API_URL}/family/public/${params.id}`);
      if (!res.ok) {
        throw new Error("Family not found");
      }
      const data = await res.json();
      setFamily(data.family);
    } catch (err) {
      console.error("Error fetching family:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Hero title="Family Details" img="/images/hero.png" />
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="text-primary h-12 w-12 animate-spin" />
            <p className="text-gray-600">Loading family details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !family) {
    return (
      <div>
        <Hero title="Family Not Found" img="/images/hero.png" />
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <span className="text-4xl">😔</span>
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Family Not Found
          </h2>
          <p className="mb-8 text-gray-600">
            The family you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/families"
            className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Families
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero title={`${family.guardian}'s Family`} img="/images/hero.png" />
      <FamilyDetailSection family={family} />
    </div>
  );
};

export default FamilyDetail;
