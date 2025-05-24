import Hero from "@/components/common/Hero";
import Blogs from "@/components/home/Blogs";
import React from "react";

const Blog = () => {
  return (
    <div>
      <Hero title="Blog" img="/images/hero.png" />
      <Blogs />
    </div>
  );
};

export default Blog;
