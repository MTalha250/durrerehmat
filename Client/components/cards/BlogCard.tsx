import React from "react";

const BlogCard = (blog: Blog) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-md shadow-md">
      <img
        src={blog.titleImage}
        alt={blog.title}
        className="w-full object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-bold">{blog.title}</h3>
        <p className="text-sm text-gray-500">{blog.description}</p>
        <p className="text-sm text-[#8EC2B5]">{blog.createdAt}</p>
      </div>
    </div>
  );
};

export default BlogCard;
