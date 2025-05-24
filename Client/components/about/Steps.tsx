import React from "react";
import Image from "next/image";

const Steps = () => {
  return (
    <div className="flex flex-col px-8 py-10 md:flex-row md:px-16 lg:px-24 xl:px-32">
      <div className="h-fit w-full md:w-1/2">
        <div className="bg-primary px-4 py-10 md:px-16">
          <h3 className="flex items-center gap-2 text-[#babab0] md:text-lg">
            <span className="inline-block h-2 w-2 rounded-full bg-white" />
            YOUR DONATION HELPS{" "}
            <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
          </h3>
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            How You Can Help
          </h1>
        </div>
        <Image
          src="/images/about-steps.jpg"
          alt="steps"
          width={500}
          height={500}
          className="h-[35vh] w-full"
        />
      </div>
      <div className="bg-greenish w-full space-y-8 px-4 py-10 md:w-1/2 md:px-16">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
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
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
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
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
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
