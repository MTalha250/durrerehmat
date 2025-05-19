import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Steps from "@/components/home/Steps";
import Activity from "@/components/home/Activity";
import React from "react";
import Video from "@/components/home/Video";
import Blogs from "@/components/home/Blogs";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Steps />
      <div className="hidden md:block">
        <Services />
      </div>
      <Activity />
      <Video />
      <Blogs />
    </div>
  );
};

export default Home;
