import React from "react";
import { ImQuestion } from "react-icons/im";
import { GiArcheryTarget } from "react-icons/gi";
import { CgFileDocument } from "react-icons/cg";

import work from "../../../shared/assets/A1.png";
import mission from "../../../shared/assets/A2.png";
import policy from "../../../shared/assets/A3.png";
import "./AboutInfo.css";

const AboutInfo = () => {
  return (
    <section className="about-info-section search-area" id="aboutInfoSection">
      <div className="container">
        <div className="row about-info-bullets">
          <div className="col-md-6">
            <h1>MODERN &amp; TRUSTED LOGISTICS COMPANY</h1>
            <p>
              Our commitment is to maintain the highest possible standards
              <br />
              of services in every aspect of our business.
            </p>
          </div>
          <div className="col-md-6 about-list">
            <ul>
              <li>Great Customer Support.</li>
              <li>Fast and Safe Delivery.</li>
              <li>Best prices for Air and Sea Cargo.</li>
              <li>7 years in Operation.</li>
              <li>We Collect Nationwide.</li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="about-info-card">
              <img className="images" src={work} />
              <h4 className="about-info-card-heading">
                <ImQuestion size={20} />
                What We Do
              </h4>
              <p className="about-info-card-text">
                We provide a fast delivery of your goods by sea and air from
                your home in UK to your door step in Kenya. Everyday hundreds of
                local and international individuals and businesses use Kenya
                Exports to send shipments and cargo conveniently, quickly, and
                securely.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="about-info-card">
              <img className="images" src={mission} />
              <h4 className="about-info-card-heading">
                <GiArcheryTarget size={25} />
                Our Mission
              </h4>
              <p className="about-info-card-text">
                To provide a reliable, efficient and cost effective services to
                meet the needs of customer. Our commitment is to maintain the
                highest possible standards of services in every aspect of our
                business. We are always actively seeking ways to improve still
                further the services that we offer.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="about-info-card">
              <img className="images" src={policy} />
              <h4 className="about-info-card-heading">
                <CgFileDocument size={25} />
                Our Policy
              </h4>
              <p className="about-info-card-text">
                Our staff members are experienced in all aspects of shipping
                household goods and personal effects overseas. From the time
                your goods are collected to final delivery they will talk you
                through the international moving process from UK to Kenya. We
                will provide guidance and advice whenever required to ensure you
                are informed and relaxed every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutInfo;
