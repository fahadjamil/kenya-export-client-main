import React, { useEffect } from "react";

import ServicesCards from "../components/Services/ServicesCards";
import ServicesBanner from "../components/Services/ServicesBanner";
import ServiceItems from "../components/Services/ServicesItems";
import OnlineShopping from "../components/Services/OnlineShopping";

const Services = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <ServicesCards />
      <ServicesBanner />
      <ServiceItems />
      <OnlineShopping />
    </React.Fragment>
  );
};

export default Services;
