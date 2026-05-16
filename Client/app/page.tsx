import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Steps from "@/components/home/Steps";
import Activity from "@/components/home/Activity";
import React from "react";
import Video from "@/components/home/Video";
import Blogs from "@/components/home/Blogs";
import FeaturedFamilies from "@/components/families/FeaturedFamilies";
import Announcements from "@/components/home/Announcements";

const Home = () => {
  return (
    <div>
      <Hero />
      <Announcements />
      <About
        subTitle="About Us"
        title="Caring for Orphan Girls in Lahore"
        description="The principal purpose of Durr-e-Rehmat Girls Orphanage is to care for orphan girls in a residential setting in Lahore. The orphanage's key aim is that all programme activities and interventions always put the best interests of the child first and foremost by promoting and protecting their well-being. We are responsible for their upbringing, health, education, social development, general welfare, training and skills development so that they can become self-sufficient and useful members of their community."
        image="/images/about.jpg"
        quote="Every orphan girl deserves a chance to grow, learn, and become a confident member of society."
      />
      <Activity />
      <Services />
      <FeaturedFamilies />
      <Steps />
      <Video />
      <Blogs />
    </div>
  );
};

export default Home;
