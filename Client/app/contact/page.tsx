import Hero from "@/components/common/Hero";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import React from "react";

const Contact = () => {
  return (
    <div>
      <Hero title="Contact" img="/images/hero.png" />
      <ContactForm />
      <Map />
    </div>
  );
};

export default Contact;
