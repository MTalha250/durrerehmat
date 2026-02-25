import React from "react";

const Impact = () => {
  const impactStats = [
    { number: "50", label: "Orphaned Daughters" },
    { number: "55", label: "Individuals in Care" },
    { number: "2021", label: "Year Founded" },
    { number: "24/7", label: "Care & Supervision" },
  ];
  return (
    <div className="bg-primary py-10">
      <div className="px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Our Impact</h2>
          <p className="mx-auto max-w-2xl text-white/80">
            Through our dedicated efforts and the support of our community, we
            have been able to make a significant positive impact.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <h3 className="mb-2 text-4xl font-extrabold md:text-5xl">
                {stat.number}
              </h3>
              <p className="text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Impact;
