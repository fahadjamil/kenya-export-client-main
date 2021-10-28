import React from "react";
import Header from "./Header";

import "./SecondarySlider.css";

const SecondarySlider = (props) => {
  let slide;
  if (props.path === "/about-us") slide = "ABOUT_US";
  else if (props.path === "/services") slide = "SERVICES";
  else if (props.path === "/marketplace") slide = "MARKETPLACE";
  else if (props.path === "/testimonials") slide = "TESTIMONIALS";
  else if (props.path === "/faqs") slide = "FAQS";
  else if (props.path === "/contact") slide = "CONTACT";
  else if (props.path === "/search-area") slide = "SEARCH_AREA";
  else if (props.path === "/services/by-sea") slide = "BY_SEA";
  else if (props.path === "/services/by-air") slide = "BY_AIR";
  else if (props.path === "/services/online-shopping")
    slide = "ONLINE_SHOPPING";
  else if (props.path === "/services/excess-baggage") slide = "EXCESS_BAGGAGE";
  else if (props.path === "/services/collection-services")
    slide = "COLLECTION_SERVICES";
  else slide = "default";

  return (
    <section className={`secondary-slider p-0 ${slide}`} id="secondarySliderSection">
      <Header />
      <div className="h-100 d-flex align-items-center">
        <div className="container">
          <h1>{slide.replace(/_/g, " ")}</h1>
        </div>
      </div>
    </section>
  );
};
export default SecondarySlider;
