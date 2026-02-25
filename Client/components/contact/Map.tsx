import React from "react";

const Map = () => {
  return (
    <div className="pl-8 md:pl-16 lg:pl-24 xl:pl-32">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6805.308697914605!2d74.25422775!3d31.478693200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190230b3f76449%3A0x2eff931d6d2bfeec!2sCanal%20View%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1772059257877!5m2!1sen!2s"
        loading="lazy"
        className="h-[500px] w-full"
      ></iframe>
    </div>
  );
};

export default Map;
