import React from "react";
import BlogGrid from "../grids/BlogGrid";

const Blogs = () => {
  const blogs = [
    {
      _id: "1",
      author: "Farah Ahmed",
      authorImage: "/images/placeholder.png",
      title: "How Your Zakat Changes Lives",
      titleImage: "/images/placeholder.png",
      description:
        "Learn how your Zakat contributions are directly transforming the lives of orphan girls at Durr-e-Rehmat, providing them with education, healthcare, and a safe home.",
      category: "donations",
      content:
        "Your Zakat plays a vital role in supporting the orphan girls at Durr-e-Rehmat Foundation.",
      timeToRead: "5",
      createdAt: "2024-06-01",
      updatedAt: "2024-06-01",
    },
    {
      _id: "2",
      author: "Farah Ahmed",
      authorImage: "/images/placeholder.png",
      title: "In-House Schooling: A New Chapter",
      titleImage: "/images/placeholder.png",
      description:
        "Our transition to in-house schooling marks the second phase of our programme, providing both religious and secular education within the orphanage.",
      category: "education",
      content:
        "The in-house school provides comprehensive education at all levels for our girls.",
      timeToRead: "7",
      createdAt: "2024-05-15",
      updatedAt: "2024-05-15",
    },
    {
      _id: "3",
      author: "Farah Ahmed",
      authorImage: "/images/placeholder.png",
      title: "From 10 to 50: Our Growth Story",
      titleImage: "/images/placeholder.png",
      description:
        "Starting with just 10 girls in November 2021, Durr-e-Rehmat has grown to care for 50 orphaned daughters. Read about our journey and future plans.",
      category: "general",
      content:
        "The orphanage started operations in November 2021 and has grown significantly.",
      timeToRead: "6",
      createdAt: "2024-04-20",
      updatedAt: "2024-04-20",
    },
    {
      _id: "4",
      author: "Farah Ahmed",
      authorImage: "/images/placeholder.png",
      title: "Sponsor a Child: Making a Difference",
      titleImage: "/images/placeholder.png",
      description:
        "Discover how sponsoring a child at Durr-e-Rehmat provides comprehensive support including food, education, medical care, and essential accessories.",
      category: "sponsorship",
      content:
        "Child sponsorship is one of the most impactful ways to support our mission.",
      timeToRead: "5",
      createdAt: "2024-03-10",
      updatedAt: "2024-03-10",
    },
    {
      _id: "5",
      author: "Farah Ahmed",
      authorImage: "/images/placeholder.png",
      title: "Volunteering at the Orphanage",
      titleImage: "/images/placeholder.png",
      description:
        "Our volunteers contribute in teaching, healthcare, mentorship, and event management. Learn how you can join our team and make a lasting impact.",
      category: "volunteering",
      content:
        "Volunteering at Durr-e-Rehmat is a rewarding experience that makes a real difference.",
      timeToRead: "4",
      createdAt: "2024-02-28",
      updatedAt: "2024-02-28",
    },
    {
      _id: "6",
      author: "Farah Ahmed",
      authorImage: "/images/placeholder.png",
      title: "Building Self-Sufficient Young Women",
      titleImage: "/images/placeholder.png",
      description:
        "Our mission goes beyond basic care. We focus on skills development and training so our girls can become self-sufficient, contributing members of society.",
      category: "general",
      content:
        "Skills development and training are core to preparing our girls for a bright future.",
      timeToRead: "6",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
  ];

  return (
    <div className="px-8 py-10 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col items-center">
        <h3 className="flex items-center gap-2 text-[#B7B7A4] md:text-lg">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          NEWS <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-blueish max-w-sm text-2xl font-bold sm:text-3xl md:text-4xl">
          Latest Updates
        </h1>
        <p className="mt-5 max-w-md text-center text-zinc-500">
          Stay updated with the latest news, stories, and developments from
          Durr-e-Rehmat Foundation.
        </p>
      </div>
      <BlogGrid blogs={blogs} />
    </div>
  );
};

export default Blogs;
