import React from "react";
import FamilyCard from "../cards/FamilyCard";

interface Props {
  families: Family[];
}

const FamilyGrid = ({ families }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 lg:grid-cols-3">
      {families.map((family) => (
        <FamilyCard key={family._id} family={family} />
      ))}
    </div>
  );
};

export default FamilyGrid;
