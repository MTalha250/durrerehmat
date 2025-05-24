import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-greenish px-8 py-20 md:px-16 lg:px-24 xl:px-32">
      <div className="text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to Make a Difference?</h2>
        <p className="mx-auto mb-8 max-w-2xl">
          Join us in our mission to create positive change. Whether through
          donations, volunteering, or spreading awareness, every contribution
          matters.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/donate"
            className="bg-primary hover:bg-primary/90 rounded px-8 py-3 font-semibold text-white transition-colors"
          >
            Donate Now
          </Link>
          <Link
            href="/contact"
            className="hover:text-greenish rounded border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white"
          >
            Get Involved
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
