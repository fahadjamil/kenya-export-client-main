import React, { useEffect } from "react";
import TestimonialCards from "../components/Clients/TestimonialCards";

const Clients = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <TestimonialCards />
    </React.Fragment>
  );
};

export default Clients;
