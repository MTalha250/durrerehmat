import React from "react";
import {
  ChevronRightIcon,
  BookOpen,
  Heart,
  Users,
  Utensils,
  Home,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Services = () => {
  const mainServices = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Religious Education",
      description:
        "Providing comprehensive Islamic education including Quran studies, Islamic history, and moral values to nurture strong faith and character in our girls.",
      features: [
        "Quran Recitation & Memorization",
        "Islamic Studies",
        "Moral & Character Building",
        "Religious Degree Courses",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Secular Education",
      description:
        "Our in-house school provides quality secular education at all levels, enabling girls to excel academically and pursue higher education at external institutions.",
      features: [
        "Primary & Secondary Education",
        "In-House Schooling",
        "Higher Education Funding",
        "Day-Scholar Programme",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Healthcare Services",
      description:
        "Ensuring the health and well-being of all girls through regular medical check-ups, vaccinations, and access to emergency medical care when needed.",
      features: [
        "Regular Health Check-ups",
        "Vaccination Programmes",
        "Emergency Medical Care",
        "Mental Health Support",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Food & Nutrition",
      description:
        "Providing three nutritious meals daily along with snacks, ensuring every girl receives balanced nutrition essential for their physical growth and development.",
      features: [
        "Three Daily Meals",
        "Balanced Nutrition",
        "Special Diet Needs",
        "Dining Hall Facility",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Residential Care",
      description:
        "A safe and nurturing residential environment with 24/7 care and supervision by experienced mother-maids who attend to the girls' day-to-day needs.",
      features: [
        "24/7 Care & Supervision",
        "Girl Dormitories",
        "Recreation Area",
        "Experienced Mother-Maids",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Skills Development",
      description:
        "Equipping girls with practical life skills and vocational training to help them become self-sufficient and make a positive contribution to Pakistani society.",
      features: [
        "Life Skills Training",
        "Vocational Courses",
        "Social Development",
        "Community Integration",
      ],
      image: "/images/placeholder.png",
    },
  ];
  return (
    <div className="bg-[#F6F4F3] px-8 py-10 md:px-16 lg:px-24 xl:px-32">
      <div className="mb-16 text-center">
        <h3 className="flex items-center justify-center gap-2 text-lg text-[#B7B7A4]">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          WHAT WE DO{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-blueish text-4xl font-bold">Our Core Services</h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
          We provide comprehensive care designed to nurture orphan girls into
          self-sufficient, confident, and well-rounded members of society.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mainServices.map((service, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded bg-white shadow-md"
          >
            <div className="relative h-48">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="bg-primary absolute top-4 left-4 rounded-lg p-3 text-white">
                {service.icon}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-blueish mb-3 text-xl font-bold">
                {service.title}
              </h3>
              <p className="mb-4 text-zinc-600">{service.description}</p>
              <ul className="mb-6 space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-zinc-500"
                  >
                    <span className="bg-primary mr-2 h-2 w-2 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="text-primary group flex items-center gap-1 text-sm font-semibold"
              >
                Learn More
                <ChevronRightIcon
                  size={16}
                  strokeWidth={2}
                  className="transition-all duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
