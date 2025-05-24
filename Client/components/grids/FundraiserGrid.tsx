import React from "react";
import FundraiserCard from "../cards/FundraiserCard";

interface Props {
  fundraisers: Fundraiser[];
}

const FundraiserGrid = ({ fundraisers }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-5 py-10 md:grid-cols-2 lg:grid-cols-3">
      {fundraisers.map((fundraiser) => (
        <FundraiserCard key={fundraiser._id} {...fundraiser} />
      ))}
    </div>
  );
};

export default FundraiserGrid;
