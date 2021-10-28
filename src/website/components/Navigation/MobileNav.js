import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import {
  FaPhoneAlt,
  FaTwitter,
  FaGooglePlusG,
  FaFacebookF,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillLinkedin } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";

import { AuthContext } from "../../../shared/context/auth-context";
import logo from "../../../shared/assets/logo.png";
import "./MobileNav.css";

const MobileNav = (props) => {
  const auth = useContext(AuthContext);

  return (
    <nav
      className={`mobile-nav-section ${
        props.activeNav ? "active" : "unactive"
      } ${props.className}`}
    >
      <div className="mobile-nav-inner">
        <div>
          <div className="d-flex align-items-center justify-content-between py-4 px-3">
            <img src={logo} width="150" />
            <button
              className="btn text-white p-0"
              onClick={props.activeNavHandler}
            >
              <IoCloseSharp size={30} />
            </button>
          </div>
          <ul className="mobile-navlinks">
            <li>
              <NavLink to="/" exact onClick={props.activeNavHandler}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" onClick={props.activeNavHandler}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={props.activeNavHandler}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/marketplace" onClick={props.activeNavHandler}>
                Marketplace
              </NavLink>
            </li>
            <li>
              <NavLink to="/testimonials" onClick={props.activeNavHandler}>
                Testimonials
              </NavLink>
            </li>
            <li>
              <NavLink to="/faqs" onClick={props.activeNavHandler}>
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={props.activeNavHandler}>
                Contact
              </NavLink>
            </li>
            <li className="mobile-login-btn">
              {auth.token ? (
                <NavLink to="/dashboard" onClick={props.activeNavHandler}>
                  <BsFillPersonLinesFill
                    className="login-icon mr-2"
                    size={18}
                  />
                  Account
                </NavLink>
              ) : (
                <NavLink to="/auth" onClick={props.activeNavHandler}>
                  <BsFillPersonLinesFill
                    className="login-icon mr-2"
                    size={18}
                  />
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
        <div className="nav-contact-info">
          <h2 className="m-0 font-weight-bold">Call us today?</h2>
          <p className="m-0 d-flex align-items-center">
            <FaPhoneAlt size={17} className="mr-3" />
            <span>
              <a href="tel:+44(0)1582561029">+44 (0) 1582 561 029</a>
              <br />
              <a href="tel:+44(0)7949531238">+44 (0) 7949 531 238</a>
            </span>
          </p>
          <p className="m-0">
            <MdEmail size={20} className="mr-3" />
            <a href="mailto:info@kenyaexports.co.uk">info@kenyaexports.co.uk</a>
          </p>
          <div className="nav-social-icons">
            <a
              href="https://www.facebook.com/Kenya-Exports-497304890312307/timeline"
              target="_blank"
            >
              <FaFacebookF size={15} className="mx-1" />
            </a>
            <a href="#">
              <AiFillLinkedin size={17} className="mx-1" />
            </a>
            <a href="#">
              <FaTwitter size={17} className="mx-1" />
            </a>
            <a href="#">
              <FaGooglePlusG size={23} className="mx-1" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
