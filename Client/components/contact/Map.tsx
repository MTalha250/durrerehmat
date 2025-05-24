import React from "react";

const Map = () => {
  return (
    <div className="pl-8 md:pl-16 lg:pl-24 xl:pl-32">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54439.024096956666!2d74.2459829379979!3d31.484614839572675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904106691c4c7%3A0xfb24ddaf1e7bc6c2!2sModel%20Town%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1748113933142!5m2!1sen!2s"
        loading="lazy"
        className="h-[500px] w-full"
      ></iframe>
    </div>
  );
};

export default Map;
