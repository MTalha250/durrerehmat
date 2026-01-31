import React from "react";
import { Users, MapPin, Heart } from "lucide-react";

interface FamilyCardProps {
  family: Family;
}

const FamilyCard = ({ family }: FamilyCardProps) => {
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "text-green-600 bg-green-50";
      case "Deceased":
        return "text-gray-600 bg-gray-100";
      case "Disabled":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="bg-primary/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {family.guardian}
              </h3>
              <p className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-3 w-3" /> {family.city}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(family.fatherStatus)}`}
          >
            Father: {family.fatherStatus}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(family.motherStatus)}`}
          >
            Mother: {family.motherStatus}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2 text-gray-600">
          <Users className="h-4 w-4" />
          <span className="text-sm">
            {family.children.length} of {family.totalChildren} children with us
          </span>
        </div>

        {family.children.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">
              Children in our care:
            </h4>
            <div className="space-y-2">
              {family.children.slice(0, 3).map((child, index) => (
                <div
                  key={child._id || index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                >
                  <span className="font-medium text-gray-700">{child.name}</span>
                  <span className="text-primary text-sm font-semibold">
                    {calculateAge(child.dateOfBirth)} years
                  </span>
                </div>
              ))}
              {family.children.length > 3 && (
                <p className="text-primary text-center text-sm font-medium">
                  +{family.children.length - 3} more children
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyCard;
