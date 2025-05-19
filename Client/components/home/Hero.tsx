import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-r from-black/50 to-black/0" />
        <div className="relative z-20 flex h-full w-full items-center px-8 text-white md:px-16 lg:px-24 xl:px-32">
          <div className="max-w-lg space-y-4">
            <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
              DURRE-E-REHMAT{" "}
              <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
            </h3>
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
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
        <div className="absolute bottom-0 z-20 hidden w-full translate-y-1/2 items-center justify-center gap-10 md:flex">
          <div className="flex h-fit w-72 flex-col items-center justify-center rounded-md bg-white p-8 text-center shadow-lg">
            <div className="mb-4 rounded-xl bg-[#F5F7F2] p-4">
              <Image
                src="/images/hero-icon1.png"
                alt="Hero Icon 1"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
            <h2 className="text-3xl font-extrabold">BECOME</h2>
            <h3 className="mb-2 text-xl font-medium">a volunteer</h3>
            <p className="text-sm font-light">
              We are looking for volunteers to help us with our mission.
            </p>
          </div>
          <div className="bg-secondary flex h-fit w-72 flex-col items-center justify-center rounded-md p-8 text-center text-white shadow-lg">
            <div className="mb-4 rounded-xl bg-[#89C3B6] p-4">
              <Image
                src="/images/hero-icon2.png"
                alt="Hero Icon 2"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
            <h2 className="text-3xl font-extrabold">GET</h2>
            <h3 className="mb-2 text-xl font-medium">involved</h3>
            <p className="text-sm font-light">
              We are looking for volunteers to help us with our mission. We are
              looking for volunteers to help us with our mission.
            </p>
          </div>
          <div className="flex h-fit w-72 flex-col items-center justify-center rounded-md bg-white p-8 text-center shadow-lg">
            <div className="mb-4 rounded-xl bg-[#F5F7F2] p-4">
              <Image
                src="/images/hero-icon3.png"
                alt="Hero Icon 3"
                width={30}
                height={30}
                className="object-cover"
              />
            </div>
            <h2 className="text-3xl font-extrabold">SPREAD</h2>
            <h3 className="mb-2 text-xl font-medium">the word</h3>
            <p className="text-sm font-light">
              We are looking for volunteers to help us with our mission.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-10 px-8 py-10 md:hidden">
        <div className="flex h-fit flex-col items-center justify-center rounded-md bg-white p-8 text-center shadow-lg">
          <div className="mb-4 rounded-xl bg-[#F5F7F2] p-4">
            <Image
              src="/images/hero-icon1.png"
              alt="Hero Icon 1"
              width={50}
              height={50}
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold">BECOME</h2>
          <h3 className="mb-2 text-xl font-medium">a volunteer</h3>
          <p className="text-sm font-light">
            We are looking for volunteers to help us with our mission.
          </p>
        </div>
        <div className="bg-secondary flex h-fit flex-col items-center justify-center rounded-md p-8 text-center text-white shadow-lg">
          <div className="mb-4 rounded-xl bg-[#89C3B6] p-4">
            <Image
              src="/images/hero-icon2.png"
              alt="Hero Icon 2"
              width={50}
              height={50}
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold">GET</h2>
          <h3 className="mb-2 text-xl font-medium">involved</h3>
          <p className="text-sm font-light">
            We are looking for volunteers to help us with our mission. We are
            looking for volunteers to help us with our mission.
          </p>
        </div>
        <div className="flex h-fit flex-col items-center justify-center rounded-md bg-white p-8 text-center shadow-lg">
          <div className="mb-4 rounded-xl bg-[#F5F7F2] p-4">
            <Image
              src="/images/hero-icon3.png"
              alt="Hero Icon 3"
              width={30}
              height={30}
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold">SPREAD</h2>
          <h3 className="mb-2 text-xl font-medium">the word</h3>
          <p className="text-sm font-light">
            We are looking for volunteers to help us with our mission.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
