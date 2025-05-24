import React from "react";

const Impact = () => {
  const impactStats = [
    { number: "15,000+", label: "Children Educated" },
    { number: "5,000+", label: "Families Helped" },
    { number: "50+", label: "Communities Served" },
    { number: "200+", label: "Volunteers" },
  ];
  return (
    <div className="bg-primary py-20">
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
