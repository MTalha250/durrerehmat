import React from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const FundraiserCard = (fundraiser: Fundraiser) => {
  return (
    <div className="overflow-hidden rounded-md bg-white shadow-md">
      <img
        src={fundraiser.image}
        alt=""
        className="h-[30vh] w-full object-cover"
      />
      <div className="flex flex-col gap-3 p-5">
        <h2 className="text-xl font-bold">{fundraiser.title}</h2>
        <p className="line-clamp-2">{fundraiser.description}</p>
        <Progress
          value={(fundraiser.amountRaised / fundraiser.totalAmount) * 100}
        />
        <p className="text-sm text-gray-500">
          PKR {fundraiser.amountRaised} of PKR {fundraiser.totalAmount} raised
        </p>
        <Link
          className="bg-primary flex w-full items-center justify-center gap-2 py-2 text-white"
          href={`/fundraiser/${fundraiser._id}`}
        >
          Donate Now <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default FundraiserCard;
