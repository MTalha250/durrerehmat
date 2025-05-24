import Hero from "@/components/common/Hero";
import About from "@/components/home/About";
import Activity from "@/components/home/Activity";
import React from "react";
import Services from "@/components/services/Services";
import Impact from "@/components/services/Impact";
import Approach from "@/components/services/Approach";
import Banner from "@/components/services/Banner";

const ServicesPage = () => {
  return (
    <div>
      <Hero title="Our Services" img="/images/hero.png" />
      <About
        subTitle="Our Services"
        title="Making a Difference Through Action"
        description="At Durre-e-Rehmat Foundation, we are committed to creating positive change in communities across the region. Our comprehensive range of services addresses the most pressing needs of society, from education and healthcare to food security and housing. We believe in holistic development that empowers individuals and strengthens communities for a better tomorrow."
        image="/images/placeholder.png"
        quote="Together, we can build a world where everyone has the opportunity to thrive and succeed."
      />
      <Services />
      <Impact />
      <Approach />
      <Banner />
      <Activity />
    </div>
  );
};

export default ServicesPage;
