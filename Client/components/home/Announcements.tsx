"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Megaphone, X, ChevronLeft, ChevronRight } from "lucide-react";

const announcements = [
  {
    id: 1,
    lang: "ur",
    image: "/images/urdu.jpeg",
    imageAlt: "Eid ul Adha Qurbani Announcement (Urdu)",
    badge: "اعلان",
    deadline: "18 مئی 2026",
    contact: "03194032268",
    content: `عید الاضحی کے موقع پر اپنی قربانی میں در رحمت فاؤنڈیشن کو بھی یاد رکھیں

محترم خواتین و حضرات،

ہمارے یتیم خانے میں مقیم 60 افراد کے لیے اس عیدالاضحیٰ پر قربانی کے گوشت کی ضرورت ہے تاکہ ان کے لیے سال بھر کھانے کا بندو بست کیا جا سکے۔ اگر آپ اپنی قربانی میں سے حصہ دینا چاہتے ہیں تو براہ کرم ہم سے رابطہ کریں۔

اس کے علاوہ، کچھ مستحق خاندان ایسے ہیں جو خود قربانی کا انتظام نہیں کر سکتے، اور ہم چاہتے ہیں کہ انہیں بھی قربانی کا گوشت فراہم کریں۔ اگر آپ کے پاس اضافی قربانیاں ہیں اور آپ انہیں کسی نیک مقصد کے لیے دینا چاہتے ہیں تو ہم آپ کی امانت کو مستحقین تک پہنچانے کا انتظام کر سکتے ہیں۔

قربانی کی بکنگ کے لیے آپ کے پاس 18 مئی 2026 تک کا وقت ہے، لہذا جو بھی اس نیک کام میں حصہ ڈالنا چاہے، وہ ہم سے جلد از جلد رابطہ کرے۔

اللہ تعالیٰ آپ کے عطیات کو قبول فرمائے اور آپ کو اس کا بہترین اجر عطا فرمائے۔`,
    contact_label: "رابطہ: فرح احمد",
  },
  {
    id: 2,
    lang: "en",
    image: "/images/eng.jpeg",
    imageAlt: "Eid ul Adha Qurbani Announcement (English)",
    badge: "Announcement",
    deadline: "25 May 2026",
    contact: "03194032268",
    content: `Remember our daughters @ Durr-e-Rehmat Foundation on this Eid ul Adha

Dear friends and well wishers,

The Qurbani meat really helps the 60 residents @ Durr-e-Rehmat Foundation for quite a few months each year. Please contact us if you are interested in being a part of this initiative.

We forward some of the Qurbani meat to some destitute families too. Please specify if you want to be a part of this initiative.

Please try to book your Qurbani as soon as possible (deadline is 25 May 2026).

May Allah give you rewards for your Niyyat and Efforts insha'Allah.

Jazakallah khairun`,
    contact_label: "Contact: Farah Ahmed",
  },
];

const Announcements = () => {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const ann = announcements[current];
  const isUrdu = ann.lang === "ur";

  const prev = () => setCurrent((c) => (c - 1 + announcements.length) % announcements.length);
  const next = () => setCurrent((c) => (c + 1) % announcements.length);

  return (
    <div className="relative bg-gradient-to-b from-amber-50 to-orange-50 px-8 py-10 md:px-16 lg:px-24 xl:px-32">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-400 to-primary" />

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcements"
        className="absolute top-4 right-8 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-gray-500 shadow-sm transition hover:bg-white hover:text-gray-800 md:right-16 lg:right-24 xl:right-32"
      >
        <X size={16} />
      </button>

      {/* Section label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="bg-primary inline-block h-2 w-2 rounded-full" />
        <div className="flex items-center gap-2 text-[#B7B7A4]">
          <Megaphone size={16} />
          <span className="text-sm font-semibold tracking-wide uppercase">
            {isUrdu ? "تازہ اعلانات" : "Latest Announcements"}
          </span>
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]" />
        </div>
      </div>

      {/* Card */}
      <div
        key={ann.id}
        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image panel */}
          <div className="relative w-full shrink-0 bg-amber-50 lg:w-2/5 xl:w-1/3">
            <Image
              src={ann.image}
              alt={ann.imageAlt}
              width={600}
              height={800}
              className="h-auto w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Overlay badge */}
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
                {ann.badge}
              </span>
            </div>
            {/* Deadline chip */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="rounded-xl bg-black/60 px-4 py-2 backdrop-blur-sm">
                <p className="text-center text-xs font-semibold text-amber-300">
                  {isUrdu ? `آخری تاریخ: ${ann.deadline}` : `Deadline: ${ann.deadline}`}
                </p>
              </div>
            </div>
          </div>

          {/* Text panel */}
          <div
            className={`flex flex-1 flex-col justify-between p-6 sm:p-8 ${isUrdu ? "text-right" : "text-left"}`}
            dir={isUrdu ? "rtl" : "ltr"}
          >
            {/* Content */}
            <div className="space-y-4">
              {ann.content.split("\n\n").map((para, i) => {
                // First paragraph is the title
                if (i === 0) {
                  return (
                    <h2
                      key={i}
                      className="text-blueish text-xl font-bold leading-snug sm:text-2xl"
                    >
                      {para}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="leading-relaxed text-zinc-600">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Contact */}
            <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-primary text-lg">📞</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">{ann.contact_label}</p>
                  <p className="text-lg font-bold text-primary">{ann.contact}</p>
                </div>
              </div>
              <a
                href={`tel:${ann.contact}`}
                className="bg-primary group flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-semibold text-white transition-all hover:opacity-90"
              >
                {isUrdu ? "ابھی رابطہ کریں" : "Contact Now"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="mt-5 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {announcements.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to announcement ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "w-7 bg-primary" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous announcement"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-gray-400">
            {current + 1} / {announcements.length}
          </span>
          <button
            onClick={next}
            aria-label="Next announcement"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-primary hover:text-primary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
