"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChevronRight, Loader2, CheckCircle } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            Durr-e-Rehmat Foundation is caring for 55 individuals, including 50
            orphaned daughters. We welcome your inquiries about donations,
            sponsorships, volunteering, or any way you can support our mission.
          </p>
          <hr />
          <div>
            <h3 className="mb-6 text-xl font-bold sm:text-2xl">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>
                  513-B Canal View Housing Society, Multan Road, Lahore
                </span>
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
      <div className="w-full bg-[#F6F4F3] py-10 pr-8 md:w-[45%] md:pr-16 lg:pr-24 xl:pr-32">
        <form
          onSubmit={handleSubmit}
          className="bg-secondary max-w-md space-y-5 p-10 text-white"
        >
          <h2 className="text-2xl font-bold">
            If You Have Any Questions, Contact Us
          </h2>
          <p>
            We accept Zakat, Kaffara, Sadaqah, Fitrana, and Fidya. Reach out and
            we will get back to you as soon as possible.
          </p>

          {success && (
            <div className="flex items-center gap-2 rounded-md bg-green-500/20 p-3 text-green-100">
              <CheckCircle className="h-5 w-5" />
              <span>Message sent successfully! We will get back to you soon.</span>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-500/20 p-3 text-red-100">
              {error}
            </div>
          )}

          <Input
            className="rounded-none bg-white py-5 text-black"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            className="rounded-none bg-white py-5 text-black"
            placeholder="Your Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Textarea
            className="rounded-none bg-white text-black"
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="flex w-full items-center gap-2 py-5 text-base"
          >
            {loading ? (
              <>
                Sending... <Loader2 className="h-5 w-5 animate-spin" />
              </>
            ) : (
              <>
                Send Message <ChevronRight />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
