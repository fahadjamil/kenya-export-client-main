import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../../shared/assets/logo.png";
import { FaLinkedinIn, FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import "./FooterSection.css";

const FooterSection = () => {
  return (
    <footer className="footer-section" id="footerSection">
      <div className="container">
        <div className="footer-row row">
          <div className="col-md-3 logo-col">
            <img src={logo} />
          </div>
          <div className="col-md-3 footer-nav">
            <ul>
              <li>
                <NavLink to="/" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us">About</NavLink>
              </li>
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
              <li>
                <NavLink to="/marketplace">Marketplace</NavLink>
              </li>
              <li>
                <NavLink to="/testimonials">Testimonials</NavLink>
              </li>
              <li>
                <NavLink to="/faqs">FAQs</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3 footer-social">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/Kenya-Exports-497304890312307/timeline"
                  target="_blank"
                >
                  <FaFacebook /> Facebook
                </a>
              </li>
              <li>
                <FaLinkedinIn /> LinkedIn
              </li>
              <li>
                <FaYoutube /> Youtube
              </li>
            </ul>
          </div>
          <div className="col-md-3 border-0">
            <ul>
              <li>
                <strong>Call us today?</strong>
              </li>
              <li>
                <a href="tel:+44(0)1582561029">+44 (0) 1582 561 029</a>
              </li>
              <li>
                <a href="tel:+44(0)7949531238">+44 (0) 7949 531 238</a>
              </li>
              <li>
                <a href="mailto:info@kenyaexports.co.uk">
                  info@kenyaexports.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          All Rights Reserved, &#169; 2021 <span>Kenya Exports</span>&nbsp;|
        </p>
        <p>
          &nbsp;Powered by&nbsp;
          <a href="https://www.mobitsolutions.com">Mobitsolutions</a>
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
