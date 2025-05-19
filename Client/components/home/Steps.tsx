import React from "react";
import Image from "next/image";

const Steps = () => {
  return (
    <div className="relative flex items-center pt-20 pr-32 pb-10">
      <div className="absolute -z-10 flex h-full w-full flex-col">
        <div className="h-full w-full bg-white"></div>
        <div className="h-full w-full bg-[#F6F4F3]"></div>
      </div>
      <div className="h-[50vh] w-1/2">
        <img
          src="/images/placeholder.png"
          alt="steps"
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="bg-greenish h-[60vh] w-1/2 px-16 py-10">
        <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
          YOUR DONATION HELPS{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-4xl font-bold text-white">How You Can Help</h1>
        <div className="mt-8 flex items-center gap-4">
          <div className="rounded-md bg-[#8FBEB2] p-3">
            <Image src="/images/step1.png" alt="step1" width={50} height={50} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              Make a Donation
            </h1>
            <p className="text-zinc-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="rounded-md bg-[#8FBEB2] p-3">
            <Image src="/images/step2.png" alt="step2" width={50} height={50} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              Start a Fundraiser
            </h1>
            <p className="text-zinc-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="rounded-md bg-[#8FBEB2] p-3">
            <Image src="/images/step3.png" alt="step3" width={50} height={50} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              Join our Efforts
            </h1>
            <p className="text-zinc-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
