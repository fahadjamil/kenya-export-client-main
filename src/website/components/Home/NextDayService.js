import React from "react";
import { FaArrowRight } from "react-icons/fa";

import "./NextDayService.css";

const NextDayService = () => {
  return (
    <section className="next-day-section" id="nextDaySection">
      <div className="container">
        <div className="col-md-6">
          <h1>KENYA NEXT DAY SERVICE</h1>
          <p>
            We are pleased to introduce our Overnight Next Day Delivery Service
            to Kenya.
          </p>
          <div className="text-danger font-weight-bold h6">
            <small className="h6 shadow rounded py-1 px-3 bg-white">
              Next day service is suspended due to pandemic!
            </small>
          </div>
          {/* <button className="arrow-hover-btn">
            <span className="apply-btn-text">APPLY</span>
            <FaArrowRight siz={10} className="arrow-btn-icon" />
          </button> */}
        </div>
      </div>
    </section>
  );
};
export default NextDayService;
