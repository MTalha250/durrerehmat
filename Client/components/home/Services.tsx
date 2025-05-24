import React from "react";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Services = () => {
  const services = [
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: false,
      title: "Education",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "/services/education",
    },
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: false,
      title: "Education",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "/services/education",
    },
    {
      image: false,
      title: "Education",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "/services/education",
    },
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: false,
      title: "Education",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "/services/education",
    },
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: false,
      title: "Education",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "/services/education",
    },
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: false,
      title: "Education",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      link: "/services/education",
    },
  ];

  return (
    <div className="bg-[#F6F4F3] pt-20">
      <div className="mb-10 flex items-center justify-between px-32">
        <div>
          <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
            <span className="bg-primary inline-block h-2 w-2 rounded-full" />
            OUR WORK{" "}
            <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
          </h3>
          <h1 className="text-blueish text-4xl font-bold">
            This is What We Do
          </h1>
        </div>
        <Link
          href="/services"
          className="bg-primary group flex items-center gap-1 rounded px-4 py-2 font-semibold text-white"
        >
          View All
          <ChevronRightIcon
            size={20}
            strokeWidth={2}
            className="transition-all duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
      <div className="grid grid-cols-4">
        {services.map((service, index) =>
          service.image ? (
            <div key={index} className="w-full">
              <Image
                src={service.url || ""}
                alt={service.title || ""}
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div key={index} className="relative w-full bg-white">
              <div className="absolute top-1/2 left-0 h-8 w-8 -translate-1/2 rotate-45 bg-white" />
              <div className="flex flex-col gap-4 p-8">
                <h3 className="text-blueish text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="text-zinc-500">{service.description}</p>
                <Link
                  href={service.link || ""}
                  className="text-primary group flex items-center gap-1 text-xs"
                >
                  <p>VIEW DETAILS</p>
                  <ChevronRightIcon
                    size={16}
                    strokeWidth={2}
                    className="transition-all duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Services;
