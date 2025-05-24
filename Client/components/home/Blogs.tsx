import React from "react";
import BlogGrid from "../grids/BlogGrid";

const Blogs = () => {
  const blogs = [
    {
      _id: "1",
      author: "Talha",
      authorImage: "/images/placeholder.png",
      title: "Blog 1",
      titleImage: "/images/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus laboriosam, neque excepturi tempore repudiandae obcaecati perferendis repellendus in?",
      category: "general",
      content: "abcd",
      timeToRead: "10",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    {
      _id: "2",
      author: "Talha",
      authorImage: "/images/placeholder.png",
      title: "Blog 1",
      titleImage: "/images/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus laboriosam, neque excepturi tempore repudiandae obcaecati perferendis repellendus in?",
      category: "general",
      content: "abcd",
      timeToRead: "10",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    {
      _id: "3",
      author: "Talha",
      authorImage: "/images/placeholder.png",
      title: "Blog 1",
      titleImage: "/images/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus laboriosam, neque excepturi tempore repudiandae obcaecati perferendis repellendus in?",
      category: "general",
      content: "abcd",
      timeToRead: "10",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    {
      _id: "4",
      author: "Talha",
      authorImage: "/images/placeholder.png",
      title: "Blog 1",
      titleImage: "/images/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus laboriosam, neque excepturi tempore repudiandae obcaecati perferendis repellendus in?",
      category: "general",
      content: "abcd",
      timeToRead: "10",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    {
      _id: "5",
      author: "Talha",
      authorImage: "/images/placeholder.png",
      title: "Blog 1",
      titleImage: "/images/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus laboriosam, neque excepturi tempore repudiandae obcaecati perferendis repellendus in?",
      category: "general",
      content: "abcd",
      timeToRead: "10",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    {
      _id: "6",
      author: "Talha",
      authorImage: "/images/placeholder.png",
      title: "Blog 1",
      titleImage: "/images/placeholder.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus laboriosam, neque excepturi tempore repudiandae obcaecati perferendis repellendus in?",
      category: "general",
      content: "abcd",
      timeToRead: "10",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
  ];

  return (
    <div className="px-8 py-10 md:px-16 md:py-20 lg:px-24 xl:px-32">
      <div className="flex flex-col items-center">
        <h3 className="flex items-center gap-2 text-[#B7B7A4] md:text-lg">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
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
