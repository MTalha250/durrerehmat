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
        "In-house religious and secular education at all levels, with funding for higher education at external institutions.",
      link: "/services",
    },
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: false,
      title: "Healthcare",
      description:
        "Regular medical check-ups, vaccinations, and emergency care to ensure the health and well-being of every girl.",
      link: "/services",
    },
    {
      image: false,
      title: "Nutrition",
      description:
        "Three nutritious daily meals and balanced nutrition plans to support healthy growth and development.",
      link: "/services",
    },
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: false,
      title: "Residential Care",
      description:
        "24/7 care and supervision by experienced mother-maids in a safe, nurturing residential environment.",
      link: "/services",
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
      title: "Skills Training",
      description:
        "Life skills and vocational training to help girls become self-sufficient and confident members of society.",
      link: "/services",
    },
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: false,
      title: "Social Development",
      description:
        "Character building, community integration, and extracurricular activities in our recreation area.",
      link: "/services",
    },
  ];
  const services2 = [
    {
      image: true,
      url: "/images/placeholder.png",
    },
    {
      image: false,
      title: "Education",
      description:
        "In-house religious and secular education with higher education funding for capable girls.",
      link: "/services",
      side: "right",
    },
    {
      image: false,
      title: "Healthcare",
      description:
        "Regular medical check-ups, vaccinations, and emergency care for every girl.",
      link: "/services",
      side: "left",
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
      title: "Nutrition",
      description:
        "Three nutritious daily meals and balanced nutrition for healthy growth.",
      link: "/services",
      side: "right",
    },
    {
      image: false,
      title: "Residential Care",
      description:
        "24/7 supervision by experienced mother-maids in a safe environment.",
      link: "/services",
      side: "left",
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
      title: "Skills Training",
      description:
        "Life skills and vocational training for self-sufficiency.",
      link: "/services",
      side: "right",
    },
    {
      image: false,
      title: "Social Development",
      description:
        "Character building and community integration activities.",
      link: "/services",
      side: "left",
    },
    {
      image: true,
      url: "/images/placeholder.png",
    },
  ];

  return (
    <div className="bg-[#F6F4F3] pt-20">
      <div className="mb-10 flex items-center justify-between px-8 md:px-16 lg:px-24 xl:px-32">
        <div>
          <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
            <span className="bg-primary inline-block h-2 w-2 rounded-full" />
            OUR WORK{" "}
            <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
          </h3>
          <h1 className="text-blueish text-2xl font-bold sm:text-3xl md:text-4xl">
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
      <div className="hidden grid-cols-4 md:grid">
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
              <div className="flex flex-col gap-4 p-5 md:p-8">
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
      <div className="grid grid-cols-2 md:hidden">
        {services2.map((service, index) =>
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
              <div
                className={`absolute top-1/2 ${
                  service.side === "right"
                    ? "left-0 -translate-x-1/2"
                    : "right-0 translate-x-1/2"
                } h-8 w-8 -translate-y-1/2 rotate-45 bg-white`}
              />
              <div className="flex flex-col gap-4 p-5 md:p-8">
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
