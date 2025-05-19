import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-white px-32 py-4 shadow">
      <div className="flex items-center gap-3">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        <div>
          <p className="text-primary text-sm font-semibold">DURRE-E-REHMAT</p>
          <p className="text-secondary text-xs tracking-[5px]">FOUNDATION</p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <ul className="flex items-center gap-8 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
        <Link
          href="/donate"
          className="bg-primary group flex items-center gap-1 rounded px-4 py-2 font-semibold text-white"
        >
          Donate
          <ChevronRightIcon
            size={20}
            strokeWidth={2}
            className="transition-all duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
