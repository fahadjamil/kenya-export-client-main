import React from "react";

const GoogleMap = () => {
  return (
    <section className="container mt-2" id='googleMapSection'>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1230.476554656963!2d-0.47403385322259756!3d51.91656660840722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876494a3bf64cad%3A0x73165c246ed1ceaf!2sKenya%20Exports!5e0!3m2!1sen!2s!4v1626082197446!5m2!1sen!2s"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </section>
  );
};

export default GoogleMap;
