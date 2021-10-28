import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiTruck, GiCommercialAirplane, GiCoins } from "react-icons/gi";

import "./ThreeSteps.css";

const ThreeSteps = () => {
  return (
    <section className="container threesteps-section" id="threeStepsSection">
      <h1 className="section-title">
        Send goods from UK to Kenya in three easy steps
      </h1>
      <div className="row">
        <div className="col-12 col-lg-4 col-md-6">
          <div className="threestep-card">
            <div>
              <div className="icon-circle">
                <GiTruck size={70} className="step-icon" />
              </div>
              <h3>We collect from you.</h3>
              <h6>
                Request collection or send goods to our dispatch centre. When
                shopping online, enter our UK address in the format shown below:
                Your Name &amp; Phone: e.g. UHURU KENYATTA 0722XXXXXX C\O
                KENEXPORTS LTD. UNIT 27B (door no) Park Avenue Ind. Estate
                Luton(City) Bedfordshire(County) LU3 3BP(Post Code)
              </h6>
            </div>
            <div className="step-number-space">
              <span className="step-number">01</span>
              <Link to="/services" className="step-click-btn">
                CLICK HERE
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6">
          <div className="threestep-card">
            <div>
              <div className="icon-circle">
                <GiCoins size={70} className="step-icon" />
              </div>
              <h3>Quote provided</h3>
              <h6>
                Goods are weighed based on the actual or volumetric weight -
                whichever is higher, and a quote provided By sea, price is £2.95
                per kilo + £20 handling fee. By Air, price from £6.50 per kilo +
                £20 handling fee.
              </h6>
            </div>
            <div className="step-number-space">
              <span className="step-number">02</span>
              <Link to="/services" className="step-click-btn">
                CLICK HERE
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6">
          <div className="threestep-card">
            <div>
              <div className="icon-circle">
                <GiCommercialAirplane size={65} className="step-icon" />
              </div>
              <h3>Goods Dispatched</h3>
              <h6>Dispatched by air every friday and by sea every 10 days!</h6>
            </div>
            <div className="step-number-space">
              <span className="step-number">03</span>
              <Link to="/services" className="step-click-btn">
                CLICK HERE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ThreeSteps;
