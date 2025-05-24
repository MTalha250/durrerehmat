import React from "react";
import FundraiserGrid from "../grids/FundraiserGrid";

const Fundraisers = () => {
  const fundraisers: Fundraiser[] = [
    {
      _id: "1",
      title: "Test Fundraiser",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae id reprehenderit illo, ab ipsam aperiam laborum voluptatibus impedit voluptatum eveniet accusamus dolore, soluta quaerat! Excepturi sed nostrum pariatur qui autem.",
      category: "general",
      image: "/images/placeholder.png",
      totalAmount: 1000,
      amountRaised: 500,
      status: "pending",
      createdAt: "1-10-2024",
      updatedAt: "1-10-2024",
    },
    {
      _id: "2",
      title: "Test Fundraiser",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae id reprehenderit illo, ab ipsam aperiam laborum voluptatibus impedit voluptatum eveniet accusamus dolore, soluta quaerat! Excepturi sed nostrum pariatur qui autem.",
      category: "general",
      image: "/images/placeholder.png",
      totalAmount: 1000,
      amountRaised: 500,
      status: "pending",
      createdAt: "1-10-2024",
      updatedAt: "1-10-2024",
    },
    {
      _id: "3",
      title: "Test Fundraiser",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae id reprehenderit illo, ab ipsam aperiam laborum voluptatibus impedit voluptatum eveniet accusamus dolore, soluta quaerat! Excepturi sed nostrum pariatur qui autem.",
      category: "general",
      image: "/images/placeholder.png",
      totalAmount: 1000,
      amountRaised: 500,
      status: "pending",
      createdAt: "1-10-2024",
      updatedAt: "1-10-2024",
    },
    {
      _id: "4",
      title: "Test Fundraiser",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae id reprehenderit illo, ab ipsam aperiam laborum voluptatibus impedit voluptatum eveniet accusamus dolore, soluta quaerat! Excepturi sed nostrum pariatur qui autem.",
      category: "general",
      image: "/images/placeholder.png",
      totalAmount: 1000,
      amountRaised: 500,
      status: "pending",
      createdAt: "1-10-2024",
      updatedAt: "1-10-2024",
    },
    {
      _id: "5",
      title: "Test Fundraiser",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae id reprehenderit illo, ab ipsam aperiam laborum voluptatibus impedit voluptatum eveniet accusamus dolore, soluta quaerat! Excepturi sed nostrum pariatur qui autem.",
      category: "general",
      image: "/images/placeholder.png",
      totalAmount: 1000,
      amountRaised: 500,
      status: "pending",
      createdAt: "1-10-2024",
      updatedAt: "1-10-2024",
    },
    {
      _id: "6",
      title: "Test Fundraiser",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae id reprehenderit illo, ab ipsam aperiam laborum voluptatibus impedit voluptatum eveniet accusamus dolore, soluta quaerat! Excepturi sed nostrum pariatur qui autem.",
      category: "general",
      image: "/images/placeholder.png",
      totalAmount: 1000,
      amountRaised: 500,
      status: "pending",
      createdAt: "1-10-2024",
      updatedAt: "1-10-2024",
    },
  ];

  return (
    <div className="px-8 pb-10 md:px-16 md:pb-20 lg:px-24 xl:px-32">
      <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
        <span className="bg-primary inline-block h-2 w-2 rounded-full" />
        Donate <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
      </h3>
      <h1 className="text-blueish text-4xl font-bold">
        Donate Now & Help People
      </h1>
      <FundraiserGrid fundraisers={fundraisers} />
    </div>
  );
};

export default Fundraisers;
