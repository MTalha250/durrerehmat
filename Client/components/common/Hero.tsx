import React from "react";
import Image from "next/image";
import { Home, ChevronRight } from "lucide-react";
import Link from "next/link";
interface Props {
  title: string;
  img: string;
}

const Hero = ({ title, img }: Props) => {
  return (
    <div className="relative h-[70vh]">
      <Image src={img} alt="Hero" className="h-full w-full object-cover" fill />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 bg-black/50 px-8 text-white md:flex-row md:justify-between md:px-16 lg:px-24 xl:px-32">
        <div>
          <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
            <span className="bg-primary inline-block h-2 w-2 rounded-full" />
            DURRE-E-REHMAT{" "}
            <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
          </h3>
          <h1 className="text-center text-4xl font-extrabold sm:text-5xl md:text-left md:text-6xl">
            {title}
          </h1>
        </div>
        <div className="bg-secondary/20 flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm backdrop-blur-md lg:text-base">
          <Link
            href="/"
            className="group flex items-center gap-2 text-gray-300 transition-colors duration-200 hover:text-white"
          >
            <Home
              size={16}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span>Home</span>
          </Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="font-medium text-white">{title}</span>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </div>
  );
};

export default Hero;
