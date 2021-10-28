import React from "react";
import { HiOutlineDesktopComputer } from "react-icons/hi";

import pc from "../../../shared/assets/pc.png";
import appointment from "../../../shared/assets/appointment.png";
import nextWeek from "../../../shared/assets/next-week.png";
import increase from "../../../shared/assets/increase.png";
import "./AboutStats.css";

const AboutStats = () => {
  return (
    <section className="about-stats-section search-area" id="aboutStatsSection">
      <div className="container">
        <div className="row">
          <div className="col-md-3 text-center">
            <img src={pc} height={100} className="mb-3" />
            <div className="statics-text">
              <h4 className="stat-title">COMPUTER</h4>
              <h1 className="stat-no">273</h1>
              <p>
                Number of computers we have <br />
                sent to Kenya in the
                <br /> past month.
              </p>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <img src={appointment} height={100} className="mb-3" />
            <div className="statics-text">
              <h4 className="stat-title">DAYS</h4>
              <h1 className="stat-no">5</h1>
              <p>By Air, cargo takes 5 days dispatch is EVERY FRIDAY</p>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <img src={nextWeek} height={100} className="mb-3" />
            <div className="statics-text">
              <h4 className="stat-title">WEEKS</h4>
              <h1 className="stat-no">6</h1>
              <p>
                By Sea the cargo takes 6 weeks from the departure date to
                delivery
              </p>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <img src={increase} height={100} className="mb-3" />
            <div className="statics-text">
              <h4 className="stat-title">YEARS OF EXP.</h4>
              <h1 className="stat-no">7</h1>
              <p>We have been keeping customers happy since 2009.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
