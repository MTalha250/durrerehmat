"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SponsorModal from "../modals/SponsorModal";
import VolunteerModal from "../modals/VolunteerModal";
import DonationModal from "../modals/DonationModal";

const Hero = () => {
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="relative h-[80vh] w-full">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero.jpg"
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 z-10 h-full w-full bg-black/50" />
          <div className="relative z-20 flex h-full w-full items-center px-8 text-white md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-lg space-y-4">
              <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
                <span className="bg-primary inline-block h-2 w-2 rounded-full" />
                DURRE-E-REHMAT{" "}
                <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
              </h3>
              <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                Is a non-profit organization
              </h1>
              <p className="text-lg">
                We help overcome poverty by providing free education to children
              </p>
              <Link
                href="/about"
                className="inline-block rounded border border-white bg-transparent px-4 py-2 text-white"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Desktop Hero Cards */}
          <div className="absolute bottom-0 z-20 hidden w-full translate-y-1/2 items-center justify-center gap-8 px-8 md:flex lg:gap-10">
            {/* Sponsor a Daughter Card */}
            <button
              onClick={() => setSponsorModalOpen(true)}
              className="flex h-fit w-72 flex-col items-center justify-center rounded-md bg-white p-5 text-center shadow-lg transition-transform hover:scale-105 lg:p-8"
            >
              <div className="mb-4 rounded-xl bg-[#F5F7F2] p-4">
                <Image
                  src="/images/hero-icon1.png"
                  alt="Sponsor Icon"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-extrabold lg:text-3xl">SPONSOR</h2>
              <h3 className="mb-2 text-lg font-medium lg:text-xl">
                a daughter
              </h3>
              <p className="text-sm font-light">
                Support a child&apos;s education, food, and medical needs.
              </p>
            </button>

            {/* Become a Volunteer Card */}
            <button
              onClick={() => setVolunteerModalOpen(true)}
              className="bg-secondary flex h-fit w-72 flex-col items-center justify-center rounded-md p-5 text-center text-white shadow-lg transition-transform hover:scale-105 lg:p-8"
            >
              <div className="mb-4 rounded-xl bg-[#89C3B6] p-4">
                <Image
                  src="/images/hero-icon2.png"
                  alt="Volunteer Icon"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-extrabold lg:text-3xl">BECOME</h2>
              <h3 className="mb-2 text-lg font-medium lg:text-xl">
                a volunteer
              </h3>
              <p className="text-sm font-light">
                Join our team of dedicated volunteers making a difference.
              </p>
            </button>

            {/* Donate Card */}
            <button
              onClick={() => setDonationModalOpen(true)}
              className="flex h-fit w-72 flex-col items-center justify-center rounded-md bg-white p-5 text-center shadow-lg transition-transform hover:scale-105 lg:p-8"
            >
              <div className="mb-4 rounded-xl bg-[#F5F7F2] p-4">
                <Image
                  src="/images/hero-icon3.png"
                  alt="Donate Icon"
                  width={30}
                  height={30}
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-extrabold lg:text-3xl">DONATE</h2>
              <h3 className="mb-2 text-lg font-medium lg:text-xl">
                for a cause
              </h3>
              <p className="text-sm font-light">
                Give Zakat, Sadaqah, Fitrana, Fidya, or Kaffara
              </p>
            </button>
          </div>
        </div>

        {/* Mobile Hero Cards */}
        <div className="flex w-full flex-col items-center justify-center gap-10 px-8 py-10 md:hidden">
          {/* Sponsor a Daughter Card */}
          <button
            onClick={() => setSponsorModalOpen(true)}
            className="flex h-fit w-full flex-col items-center justify-center rounded-md bg-white p-8 text-center shadow-lg"
          >
            <div className="mb-4 rounded-xl bg-[#F5F7F2] p-4">
              <Image
                src="/images/hero-icon1.png"
                alt="Sponsor Icon"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-extrabold">SPONSOR</h2>
            <h3 className="mb-2 text-xl font-medium">a daughter</h3>
            <p className="text-sm font-light">
              Support a child&apos;s education, food, and medical needs.
            </p>
          </button>

          {/* Become a Volunteer Card */}
          <button
            onClick={() => setVolunteerModalOpen(true)}
            className="bg-secondary flex h-fit w-full flex-col items-center justify-center rounded-md p-8 text-center text-white shadow-lg"
          >
            <div className="mb-4 rounded-xl bg-[#89C3B6] p-4">
              <Image
                src="/images/hero-icon2.png"
                alt="Volunteer Icon"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-extrabold">BECOME</h2>
            <h3 className="mb-2 text-xl font-medium">a volunteer</h3>
            <p className="text-sm font-light">
              Join our team of dedicated volunteers making a difference.
            </p>
          </button>

          {/* Donate Card */}
          <button
            onClick={() => setDonationModalOpen(true)}
            className="flex h-fit w-full flex-col items-center justify-center rounded-md bg-white p-8 text-center shadow-lg"
          >
            <div className="mb-4 rounded-xl bg-[#F5F7F2] p-4">
              <Image
                src="/images/hero-icon3.png"
                alt="Donate Icon"
                width={30}
                height={30}
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-extrabold">DONATE</h2>
            <h3 className="mb-2 text-xl font-medium">for a cause</h3>
            <p className="text-sm font-light">
              Give Zakat, Sadaqah, Fitrana, Fidya, or Kaffara.
            </p>
          </button>
        </div>
      </div>

      {/* Modals */}
      <SponsorModal
        isOpen={sponsorModalOpen}
        onClose={() => setSponsorModalOpen(false)}
      />
      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </>
  );
};

export default Hero;
