import Hero from "@/components/common/Hero";
import Fundraisers from "@/components/donate/Fundraisers";
import Activity from "@/components/home/Activity";
import React from "react";

const Donate = () => {
  return (
    <div>
      <Hero title="Donation" img="/images/hero.png" />
      <Activity />
      <Fundraisers />
    </div>
  );
};

export default Donate;
