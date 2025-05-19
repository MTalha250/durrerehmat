import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

const Activity = () => {
  return (
    <div className="pt-20">
      <div className="relative flex gap-20 px-32">
        <div className="absolute top-0 left-0 -z-10 flex h-full w-full flex-col">
          <div className="h-3/5 w-full bg-white"></div>
          <div className="bg-blueish h-2/5 w-full"></div>
        </div>
        <div className="flex w-3/5 flex-col gap-4 pb-20">
          <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
            ACTIVITY{" "}
            <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
          </h3>
          <h1 className="text-blueish max-w-sm text-4xl font-bold">
            You Can Help by Donating
          </h1>
          <p className="text-zinc-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
            delectus laboriosam, neque excepturi tempore repudiandae obcaecati
            perferendis repellendus in? Laborum corrupti veritatis perferendis
            eligendi sed assumenda, reiciendis ab dolores labore! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Asperiores, velit
            maxime incidunt eligendi dignissimos pariatur reprehenderit quas,
            nam repellat accusamus saepe sit nihil dolorem. Nemo adipisci quasi
            dolore amet dolorem.
          </p>
          <Link
            href="/services"
            className="bg-primary group flex w-fit items-center gap-1 rounded px-4 py-2 font-semibold text-white"
          >
            Read More
            <ChevronRightIcon
              size={20}
              strokeWidth={2}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="h-96 bg-zinc-300"></div>
            <div className="h-96 bg-zinc-300"></div>
          </div>
        </div>
        <div className="w-2/5 pt-20">
          <Image
            src="/images/placeholder.png"
            alt="activity"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="px-32">
        <div className="bg-primary flex items-center justify-center gap-20 rounded-b-2xl p-10">
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="text-5xl font-extrabold">7350</h2>
            <p className="mt-2">Donations Made</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="text-5xl font-extrabold">7350</h2>
            <p className="mt-2">Donations Made</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="text-5xl font-extrabold">7350</h2>
            <p className="mt-2">Donations Made</p>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
            <h2 className="text-5xl font-extrabold">7350</h2>
            <p className="mt-2">Donations Made</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
