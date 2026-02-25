import React from "react";

const Map = () => {
  return (
    <div className="pl-8 md:pl-16 lg:pl-24 xl:pl-32">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3402.5975579134874!2d74.24837107560991!3d31.480254974232498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDI4JzQ4LjkiTiA3NMKwMTUnMDMuNCJF!5e0!3m2!1sen!2s!4v1772060065347!5m2!1sen!2s"
        loading="lazy"
        className="h-[500px] w-full"
      ></iframe>
    </div>
  );
};

export default Map;
