"use client";
import React, { useState } from "react";
import Image from "next/image";
import SponsorModal from "../modals/SponsorModal";
import VolunteerModal from "../modals/VolunteerModal";
import DonationModal from "../modals/DonationModal";

const Steps = () => {
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <>
      <div className="relative flex flex-col-reverse items-center gap-10 px-8 pt-10 pb-10 md:flex-row md:gap-0 md:px-0 md:pt-20 md:pr-16 lg:pr-24 xl:pr-32">
        <div className="absolute -z-10 flex h-full w-full flex-col">
          <div className="h-full w-full bg-white"></div>
          <div className="h-full w-full bg-[#F6F4F3]"></div>
        </div>
        <div className="h-[50vh] w-full md:w-1/2">
          <Image
            src="/images/steps.jpg"
            alt="steps"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="bg-greenish w-full px-4 py-10 md:w-1/2 md:px-8 lg:px-16">
          <h3 className="flex items-center gap-2 text-[#B7B7A4] md:text-lg">
            <span className="bg-primary inline-block h-2 w-2 rounded-full" />
            GET INVOLVED{" "}
            <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
          </h3>
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            How You Can Help
          </h1>
          <button
            onClick={() => setDonationModalOpen(true)}
            className="mt-8 flex w-full cursor-pointer flex-col items-center gap-4 text-center transition-opacity hover:opacity-80 md:flex-row md:text-left"
          >
            <div className="rounded-md bg-[#8FBEB2] p-3">
              <Image
                src="/images/step1.png"
                alt="step1"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                Donate for a Cause
              </h1>
              <p className="text-zinc-200">
                Your Zakat, Sadaqah, Fitrana, Fidya, or Kaffara directly
                supports the upbringing, health, and education of orphan girls.
              </p>
            </div>
          </button>
          <button
            onClick={() => setSponsorModalOpen(true)}
            className="mt-8 flex w-full cursor-pointer flex-col items-center gap-4 text-center transition-opacity hover:opacity-80 md:flex-row md:text-left"
          >
            <div className="rounded-md bg-[#8FBEB2] p-3">
              <Image
                src="/images/step2.png"
                alt="step2"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                Sponsor a Daughter
              </h1>
              <p className="text-zinc-200">
                Choose to sponsor a child&apos;s education, food, medical care,
                or all of the above through our sponsorship programme.
              </p>
            </div>
          </button>
          <button
            onClick={() => setVolunteerModalOpen(true)}
            className="mt-8 flex w-full cursor-pointer flex-col items-center gap-4 text-center transition-opacity hover:opacity-80 md:flex-row md:text-left"
          >
            <div className="rounded-md bg-[#8FBEB2] p-3">
              <Image
                src="/images/step3.png"
                alt="step3"
                width={50}
                height={50}
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                Become a Volunteer
              </h1>
              <p className="text-zinc-200">
                Join our team as a volunteer in teaching, healthcare, mentorship,
                or event management to make a lasting impact.
              </p>
            </div>
          </button>
        </div>
      </div>

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

export default Steps;
