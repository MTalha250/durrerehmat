import React from "react";
import BlogGrid from "../grids/BlogGrid";

const Blogs = () => {
  const blogs = [
    {
      id: "1",
      title: "Blog 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus laboriosam, neque excepturi tempore repudiandae obcaecati perferendis repellendus in?",
      image: "/images/placeholder.png",
      date: "2021-01-01",
    },
    {
      id: "2",
      title: "Blog 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus laboriosam, neque excepturi tempore repudiandae obcaecati perferendis repellendus in?",
      image: "/images/placeholder.png",
      date: "2021-01-01",
    },
    {
      id: "3",
      title: "Blog 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus laboriosam, neque excepturi tempore repudiandae obcaecati perferendis repellendus in?",
      image: "/images/placeholder.png",
      date: "2021-01-01",
    },
  ];

  return (
    <div className="px-8 py-10 md:px-16 md:py-20 lg:px-24 xl:px-32">
      <div className="flex flex-col items-center">
        <h3 className="flex items-center gap-2 text-[#B7B7A4] md:text-lg">
          NEWS <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-blueish max-w-sm text-2xl font-bold sm:text-3xl md:text-4xl">
          Latest Updates
        </h1>
        <p className="mt-5 max-w-md text-center text-zinc-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus
          laboriosam, neque excepturi tempore repudiandae obcaecati perferendis
          repellendus in?
        </p>
      </div>
      <BlogGrid blogs={blogs} />
    </div>
  );
};

export default Blogs;
