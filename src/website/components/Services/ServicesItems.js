import React from "react";

import img7 from "../../../shared/assets/s7.png";
import "./ServicesItems.css";

const ServiceItems = () => {
  return (
    <section className="container service-item-section" id="servicesProhibitedSection">
      <img className="prohibited-image" src={img7} alt="Service Items" />
      <h1 className="prohibited-heading">PROHIBITED ITEMS BY AIR</h1>
      <div className="items">
        <div className="row">
          <div className="col-md-4">
            <ul>
              <li>adhesives</li>
              <li>aerosols</li>
              <li>airbags for cars</li>
              <li>alcohol</li>
              <li>ammunition</li>
              <li>camping stoves</li>
              <li>cigrette lighters</li>
              <li>cleaners &amp; solvents</li>
              <li>compressed air/gas cylinders</li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              <li>fire extinguishers</li>
              <li>fireworks</li>
              <li>fuel containers</li>
              <li>fuel flammable liquids</li>
              <li>gasoline</li>
              <li>helium</li>
              <li>insecticides</li>
              <li>narcotic (all illegal drugs) including khat</li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              <li>life jackets &amp; self inflating rafts</li>
              <li> liquid bleach/chlorine</li>
              <li> lithium batteries</li>
              <li> furs/skins</li>
              <li> firearms/swords</li>
              <li> mobile phones</li>
              <li> laptops</li>
              <li> tablets</li>
              <li> nail polish/vanish</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceItems;
