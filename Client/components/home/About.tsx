import React from "react";
import Image from "next/image";

interface AboutProps {
  subTitle: string;
  title: string;
  description: string;
  image: string;
  quote?: string;
}

const About = ({ subTitle, title, description, image, quote }: AboutProps) => {
  return (
    <div className="flex flex-col gap-10 px-8 py-10 md:flex-row md:gap-20 md:px-16 md:py-20 lg:px-24 xl:px-32">
      <div className="w-full space-y-4 md:w-1/2">
        <h3 className="flex items-center gap-2 text-[#B7B7A4] sm:text-lg">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          {subTitle}{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-blueish max-w-md text-2xl font-bold sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <p className="text-zinc-500 sm:text-lg">{description}</p>
      </div>
      <div className="w-full md:w-1/2">
        <Image
          src={image}
          alt="About Image"
          width={500}
          height={350}
          className="w-full rounded-md object-cover"
        />
        {quote && (
          <div className="mt-10 flex items-center gap-10">
            <Image src="/images/comma.png" alt="comma" width={50} height={50} />
            <p className="font-bold sm:text-lg">{quote}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
