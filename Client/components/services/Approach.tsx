import React from "react";
import Image from "next/image";

const Approach = () => {
  return (
    <div className="px-8 py-20 md:px-16 lg:px-24 xl:px-32">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg text-[#B7B7A4]">
            <span className="bg-primary inline-block h-2 w-2 rounded-full" />
            OUR APPROACH{" "}
            <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
          </h3>
          <h2 className="text-blueish mb-6 text-3xl font-bold">
            How We Make a Difference
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                1
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Rescue & Admit
                </h4>
                <p className="text-zinc-600">
                  We identify orphan girls from Lahore and surrounding districts
                  who need residential care and support.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                2
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Nurture & Educate
                </h4>
                <p className="text-zinc-600">
                  Girls receive 24/7 care from experienced mother-maids along
                  with in-house religious and secular education at all levels.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                3
              </div>
              <div>
                <h4 className="mb-2 text-lg font-semibold">
                  Empower & Develop
                </h4>
                <p className="text-zinc-600">
                  We equip girls with life skills and fund higher education for
                  those academically capable, building self-sufficient young women.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/approach.jpg"
            alt="Our Approach"
            width={500}
            height={400}
            className="max-h-[50vh] w-full rounded-md object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

export default Approach;
