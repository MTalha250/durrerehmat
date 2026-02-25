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
        title="Caring for Orphan Girls in Lahore"
        description="At Durr-e-Rehmat Foundation, we provide comprehensive residential care for orphan girls in Lahore. Our services encompass education, healthcare, nutrition, shelter, and skills development. We believe every orphan girl deserves the chance to grow into a self-sufficient and confident member of society, making a positive contribution to Pakistan."
        image="/images/services.jpg"
        quote="Every child deserves a safe home, quality education, and the opportunity to thrive."
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
