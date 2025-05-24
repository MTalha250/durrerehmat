import React from "react";

const Video = () => {
  return (
    <div className="flex flex-col gap-10 px-8 py-10 md:flex-row md:px-16 lg:gap-20 lg:px-24 xl:px-32">
      <div className="h-[50vh] w-full rounded-md bg-zinc-300 md:w-1/2"></div>
      <div className="w-full space-y-4 md:w-1/2">
        <h3 className="flex items-center gap-2 text-[#B7B7A4] md:text-lg">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          HOW DO WE DO IT{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-blueish max-w-md text-2xl font-bold sm:text-3xl md:text-4xl">
          Helping Hands for Everyone
        </h1>
        <p className="text-zinc-500 lg:text-lg">
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
