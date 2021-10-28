import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaTwitter,
  FaGooglePlusG,
  FaFacebookF,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillLinkedin } from "react-icons/ai";
import "./VeryTopBar.css";

const VeryTopBar = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  useEffect(() => {
    setShowTopBar(window.innerWidth >= 992 ? true : false);
  }, []);

  return (
    <nav className="very-top-bar" id="veryTopBarSection">
      {showTopBar && (
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6">
              <div className="row justify-content-between align-items-center">
                <p className="m-0 font-weight-bold">Call us today?</p>
                <p className="m-0">
                  <FaPhoneAlt size={15} className="mr-2" />
                  <a href="tel:+44(0)1582561029">+44 (0) 1582 561 029</a>,{" "}
                  <a href="tel:+44(0)7949531238">+44 (0) 7949 531 238</a>
                </p>
                <p className="m-0">
                  <MdEmail size={20} className="mr-2" />
                  <a href="mailto:info@kenyaexports.co.uk">
                    info@kenyaexports.co.uk
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-4 row justify-content-end align-items-center">
              <a
                href="https://www.facebook.com/Kenya-Exports-497304890312307/timeline"
                target="_blank"
              >
                <FaFacebookF size={15} className="social-icon" />
              </a>
              <AiFillLinkedin size={17} className="social-icon" />
              <FaTwitter size={17} className="social-icon" />
              {/* <FaGooglePlusG size={23} className="social-icon" /> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default VeryTopBar;
