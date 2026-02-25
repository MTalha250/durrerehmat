"use client";
import React from "react";

const Video = () => {
  return (
    <div className="flex flex-col gap-10 px-8 py-10 md:flex-row md:px-16 lg:gap-20 lg:px-24 xl:px-32">
      <div className="h-[50vh] w-full md:w-1/2">
        <video
          src="/images/home-video.mp4"
          className="h-full w-full rounded-md object-cover"
          controls
        />
      </div>
      <div className="w-full space-y-4 md:w-1/2">
        <h3 className="flex items-center gap-2 text-[#B7B7A4] md:text-lg">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          HOW DO WE DO IT{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-blueish max-w-md text-2xl font-bold sm:text-3xl md:text-4xl">
          Helping Hands for Everyone
        </h1>
        <p className="text-zinc-500 lg:text-lg">
          At Durr-e-Rehmat, our girls are under 24-hour care and supervision of
          experienced mother-maids who look after their day-to-day needs. Our
          in-house school provides both religious and secular education at all
          levels, enabling girls to excel academically. Those who are capable are
          funded for higher education at external institutions. The residential
          facilities include dormitories, staff accommodation, a teaching block,
          dining hall, and recreation area.
        </p>
      </div>
    </div>
  );
};

export default Video;
