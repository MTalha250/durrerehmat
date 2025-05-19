import React from "react";
import Image from "next/image";
const About = () => {
  return (
    <div className="flex gap-20 px-32 py-20">
      <div className="w-1/2 space-y-4">
        <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
          ABOUT US{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-blueish max-w-md text-4xl font-bold">
          Education for every children
        </h1>
        <p className="text-lg text-zinc-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          vero voluptatibus quia reprehenderit maxime, amet quidem ipsa expedita
          obcaecati sed magni velit fugiat pariatur nam nesciunt quasi delectus
          cumque. Fugiat. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Alias quasi a nemo id voluptatibus minus ipsum quidem beatae non
          animi dolores cumque, soluta iste suscipit vero ducimus nihil possimus
          maxime. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos,
          eum. Laboriosam voluptates quos voluptate nobis alias ad sit non
          corrupti,
        </p>
      </div>
      <div className="w-1/2">
        <Image
          src="/images/placeholder.png"
          alt="About Image"
          width={500}
          height={350}
          className="h-[40vh] w-full rounded-md object-cover"
        />
        <div className="mt-10 flex items-center gap-10">
          <Image src="/images/comma.png" alt="comma" width={50} height={50} />
          <p className="text-lg font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
