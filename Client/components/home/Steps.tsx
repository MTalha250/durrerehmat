import React from "react";
import Image from "next/image";

const Steps = () => {
  return (
    <div className="relative flex flex-col-reverse items-center gap-10 px-8 pt-10 pb-10 md:flex-row md:gap-0 md:px-0 md:pt-20 md:pr-16 lg:pr-24 xl:pr-32">
      <div className="absolute -z-10 flex h-full w-full flex-col">
        <div className="h-full w-full bg-white"></div>
        <div className="h-full w-full bg-[#F6F4F3]"></div>
      </div>
      <div className="h-[50vh] w-full md:w-1/2">
        <img
          src="/images/placeholder.png"
          alt="steps"
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="bg-greenish w-full px-4 py-10 md:w-1/2 md:px-8 lg:px-16">
        <h3 className="flex items-center gap-2 text-[#B7B7A4] md:text-lg">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          DONATION{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          How You Can Help
        </h1>
        <div className="mt-8 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
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
        <div className="mt-8 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
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
        <div className="mt-8 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
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
