import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

const Activity = () => {
  return (
    <div className="">
      <div className="relative flex flex-col gap-10 px-8 md:flex-row md:px-16 lg:gap-20 lg:px-24 xl:px-32">
        <div className="absolute top-0 left-0 -z-10 flex h-full w-full flex-col">
          <div className="h-3/5 w-full bg-[#F6F4F3]"></div>
          <div className="bg-blueish h-2/5 w-full"></div>
        </div>
        <div className="flex w-full flex-col gap-4 py-10 md:w-1/2 lg:w-3/5">
          <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
            <span className="bg-primary inline-block h-2 w-2 rounded-full" />
            DONATE{" "}
            <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
          </h3>
          <h1 className="text-blueish max-w-sm text-2xl font-bold sm:text-3xl md:text-4xl">
            You Can Help by Donating
          </h1>
          <p className="text-zinc-500">
            Durr-e-Rehmat Foundation is caring for 55 individuals, including 50
            orphaned daughters. We accept Zakat, Kaffara, Sadaqah, Fitrana, and
            Fidya. Your generous contributions help us provide education,
            healthcare, nutrition, and a safe home for these children.
          </p>
          <Link
            href="/donate"
            className="bg-primary group flex w-fit items-center gap-1 rounded px-4 py-2 font-semibold text-white"
          >
            Donate Now
            <ChevronRightIcon
              size={20}
              strokeWidth={2}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Bank Details Card */}
          <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-blueish mb-4 text-xl font-bold">
              Bank Details
            </h3>
            <div className="space-y-2 text-sm text-zinc-600">
              <p>
                <span className="font-semibold text-zinc-800">
                  Account Title:
                </span>{" "}
                DURR-E-REHMAT FOUNDATION
              </p>
              <p>
                <span className="font-semibold text-zinc-800">IBAN:</span>{" "}
                PK69BKIP0202900879630001
              </p>
              <p>
                <span className="font-semibold text-zinc-800">Bank:</span> Bank
                Islami Pakistan Limited
              </p>
              <p>
                <span className="font-semibold text-zinc-800">Branch:</span>{" "}
                Thokar Niaz Baig Branch, Lahore
              </p>
            </div>
            <div className="mt-4 border-t border-zinc-100 pt-4 text-sm text-zinc-600">
              <p>
                <span className="font-semibold text-zinc-800">Phone:</span>{" "}
                +92 319 4032268
              </p>
              <p>
                <span className="font-semibold text-zinc-800">Address:</span>{" "}
                513-B Canal View Housing Society, Multan Road, Lahore
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pt-20 lg:w-2/5">
          <Image
            src="/images/activity.jpg"
            alt="activity"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="px-8 pb-10 md:px-16 md:pb-20 lg:px-24 xl:px-32">
        <div className="bg-primary flex flex-col items-center justify-center gap-10 rounded-b-2xl p-10 md:flex-row lg:gap-20">
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-extrabold lg:text-5xl">55</h2>
            <p className="mt-2">Individuals in Care</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-extrabold lg:text-5xl">50</h2>
            <p className="mt-2">Orphaned Daughters</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-extrabold lg:text-5xl">2021</h2>
            <p className="mt-2">Founded</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-extrabold lg:text-5xl">24/7</h2>
            <p className="mt-2">Care & Supervision</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
