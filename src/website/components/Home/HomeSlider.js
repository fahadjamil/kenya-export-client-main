import React from "react";

import Calculator from "./Calculator";
import Header from "../Navigation/Header";

import "./HomeSlider.css";

const HomeSlider = () => {
  return (
    <section className="main-slider p-0" id="homeSliderSection">
      <Header />
      <div className="h-100 d-flex align-items-center">
        <div className="container">
          <h1>Excellent Rates when sending parcels from UK to Kenya</h1>
          <h3>From only £2.95 per kilo + £20 handling fee</h3>
          <Calculator />
        </div>
      </div>
    </section>
  );
};
export default HomeSlider;
