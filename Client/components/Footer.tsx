"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="bg-blueish px-8 py-10 text-white md:px-16 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex items-center justify-center md:justify-start">
            <div className="rounded-md bg-white p-4">
              <Image
                src="/images/logo2.png"
                alt="Durr-e-Rehmat Foundation"
                width={180}
                height={164}
              />
            </div>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-bold sm:text-2xl">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/families">Our Families</Link>
              </li>
              <li>
                <Link href="/donate">Donate</Link>
              </li>
              <li>
                <Link href="/services">Our Services</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-bold sm:text-2xl">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/donate">Donate</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xl font-bold sm:text-2xl">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>513-B Canal View Housing Society, Multan Road, Lahore</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>durrerehmatfoundation@gmail.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+92 319 4032268</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-700 pt-8 md:flex-row">
          <p className="text-center text-sm sm:text-base md:text-left">
            © {new Date().getFullYear()} Durr-e-Rehmat Foundation (Registered). All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 text-black md:mt-0">
            <a
              href="https://www.facebook.com/p/Durr-e-Rehmat-61550893370194/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#8FBEB2] p-2 hover:bg-[#8FBEB2]/80"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <p className="bg-black py-4 text-center text-sm font-medium tracking-wide text-white">
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/m-talha-990337246/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8FBEB2] underline underline-offset-4 transition duration-300 ease-in-out hover:text-white"
          onMouseEnter={() =>
            window.open(
              "https://www.linkedin.com/in/m-talha-990337246/",
              "_blank",
            )
          }
        >
          Talha
        </a>
      </p>
    </div>
  );
};

export default Footer;
