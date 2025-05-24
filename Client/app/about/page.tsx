import Hero from "@/components/common/Hero";
import About from "@/components/home/About";
import Activity from "@/components/home/Activity";
import Steps from "@/components/about/Steps";
import Video from "@/components/about/Video";

import React from "react";

const AboutPage = () => {
  return (
    <div>
      <Hero title="About Us" img="/images/hero.png" />
      <About
        subTitle="About Us"
        title="We are a team of experienced professionals"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci vero voluptatibus quia reprehenderit maxime, amet quidem ipsa expedita obcaecati sed magni velit fugiat pariatur nam nesciunt quasi delectus cumque. Fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quasi a nemo id voluptatibus minus ipsum quidem beatae non animi dolores cumque, soluta iste suscipit vero ducimus nihil possimus maxime. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, eum. Laboriosam voluptates quos voluptate nobis alias ad sit non corrupti,"
        image="/images/placeholder.png"
      />
      <Steps />
      <Video />
      <Activity />
    </div>
  );
};

export default AboutPage;
