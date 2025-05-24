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
      title: "Education & Learning",
      description:
        "Providing quality education and learning opportunities for children from underprivileged communities. We believe every child deserves access to knowledge.",
      features: [
        "Primary Education",
        "Adult Literacy Programs",
        "Skill Development",
        "Digital Learning",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Healthcare Services",
      description:
        "Delivering essential healthcare services and medical support to communities in need. Health is a fundamental right for everyone.",
      features: [
        "Medical Camps",
        "Vaccination Programs",
        "Health Awareness",
        "Emergency Care",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Food & Nutrition",
      description:
        "Fighting hunger and malnutrition by providing nutritious meals and food security programs for families and children.",
      features: [
        "Meal Programs",
        "Food Distribution",
        "Nutrition Education",
        "Community Kitchens",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Housing & Shelter",
      description:
        "Building homes and providing safe shelter for homeless families and individuals, creating stable foundations for better lives.",
      features: [
        "Emergency Shelter",
        "Home Construction",
        "Rehabilitation",
        "Safe Spaces",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Development",
      description:
        "Empowering communities through sustainable development programs that create lasting positive change and self-reliance.",
      features: [
        "Leadership Training",
        "Economic Development",
        "Women Empowerment",
        "Youth Programs",
      ],
      image: "/images/placeholder.png",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Vocational Training",
      description:
        "Equipping individuals with practical skills and vocational training to help them secure sustainable employment and build careers.",
      features: [
        "Technical Skills",
        "Certification Programs",
        "Job Placement",
        "Entrepreneurship Support",
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
          We provide comprehensive services designed to address the fundamental
          needs of communities and create lasting positive impact.
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
