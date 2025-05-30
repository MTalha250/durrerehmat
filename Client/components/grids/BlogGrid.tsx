import React from "react";
import BlogCard from "../cards/BlogCard";

interface Props {
  blogs: Blog[];
}

const BlogGrid = ({ blogs }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-5 py-10 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} {...blog} />
      ))}
    </div>
  );
};

export default BlogGrid;
