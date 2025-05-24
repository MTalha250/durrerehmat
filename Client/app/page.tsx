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
      <About
        subTitle="About Us"
        title="Education for every children"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci vero voluptatibus quia reprehenderit maxime, amet quidem ipsa expedita obcaecati sed magni velit fugiat pariatur nam nesciunt quasi delectus cumque. Fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quasi a nemo id voluptatibus minus ipsum quidem beatae non animi dolores cumque, soluta iste suscipit vero ducimus nihil possimus maxime. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, eum. Laboriosam voluptates quos voluptate nobis alias ad sit non corrupti,"
        image="/images/placeholder.png"
        quote="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
      <Steps />
      <Services />
      <Activity />
      <Video />
      <Blogs />
    </div>
  );
};

export default Home;
