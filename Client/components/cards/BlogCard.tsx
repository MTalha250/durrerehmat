import React from "react";

interface Props {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

const BlogCard = ({ id, image, title, description, date }: Props) => {
  return (
    <div className="flex flex-col shadow-md">
      <img src={image} alt={title} className="w-full object-cover" />
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-sm text-[#8EC2B5]">{date}</p>
      </div>
    </div>
  );
};

export default BlogCard;
