import React, { useEffect } from "react";

import CollectionUpdate from "../components/Home/CollectionUpdates";
import Newsletter from "../components/Home/Newsletter";
import ServiceCards from "../components/Services/ServicesCards";
import NextDayService from "../components/Home/NextDayService";
import OnlineShopping from "../components/Home/OnlineShopping";
import ThreeSteps from "../components/Home/ThreeSteps";

import "./Home.css";

const Home = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <ThreeSteps />
      <NextDayService />
      <ServiceCards />
      {/* <OnlineShopping /> */}
      <Newsletter />
      <CollectionUpdate />
    </React.Fragment>
  );
};
export default Home;
