import React from "react";

const Video = () => {
  return (
    <div className="flex gap-20 px-32 py-20">
      <div className="h-[50vh] w-1/2 bg-zinc-300"></div>
      <div className="w-1/2 space-y-4">
        <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
          HOW DO WE DO IT{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-blueish max-w-md text-4xl font-bold">
          Helping Hands for Everyone
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
    </div>
  );
};

export default Video;
