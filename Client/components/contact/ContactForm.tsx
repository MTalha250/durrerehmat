import React from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full py-10 pr-8 pl-8 md:w-[55%] md:pl-16 lg:pl-24 xl:pl-32">
        <h3 className="flex items-center gap-2 text-lg text-[#B7B7A4]">
          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
          Contact{" "}
          <span className="inline-block h-[1px] w-8 bg-[#B7B7A4]"></span>
        </h3>
        <h1 className="text-blueish text-4xl font-bold">Get in Touch!</h1>
        <div className="space-y-5">
          <div className="mt-10 flex items-center gap-2">
            <Image src="/images/logo.png" alt="logo" width={50} height={50} />
            <h3 className="text-2xl font-semibold">We Help</h3>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Perferendis placeat rerum at temporibus odit animi nesciunt,
            asperiores dolor libero. Ullam quidem quae et eveniet culpa earum
            neque perferendis distinctio rerum!
          </p>
          <hr />
          <div>
            <h3 className="mb-6 text-xl font-bold sm:text-2xl">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>021 Hollywood Boulevard, Los Angeles</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>info@yourdomain.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>(021) 345-6789</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 flex space-x-4 text-black md:mt-0">
            <a
              href="#"
              className="rounded-full bg-[#8FBEB2] p-2 hover:bg-[#8FBEB2]/80"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-[#8FBEB2] p-2 hover:bg-[#8FBEB2]/80"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-[#8FBEB2] p-2 hover:bg-[#8FBEB2]/80"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-full bg-[#8FBEB2] p-2 hover:bg-[#8FBEB2]/80"
            >
              <FaYoutube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#F6F4F3] py-10 pr-8 md:w-[45%] md:pr-16 lg:pr-24 xl:pr-32">
        <div className="bg-secondary max-w-md space-y-5 p-10 text-white">
          <h2 className="text-2xl font-bold">
            If You Have Any Questions, Contact Us
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <Input
            className="rounded-none bg-white py-5 text-black"
            placeholder="Your Name"
          />
          <Input
            className="rounded-none bg-white py-5 text-black"
            placeholder="Your Email"
          />
          <Textarea
            className="rounded-none bg-white text-black"
            placeholder="Message"
            rows={5}
          />
          <Button className="flex w-full items-center gap-2 py-5 text-base">
            Send Message <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
