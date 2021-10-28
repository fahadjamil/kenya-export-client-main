import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";

import { AuthContext } from "../../../shared/context/auth-context";
import logo from "../../../shared/assets/logo.png";
import { SearchContext } from "../../../shared/context/search-context";
import MobileNav from "./MobileNav";
import "./Header.css";

const Header = () => {
  const auth = useContext(AuthContext);
  const search = useContext(SearchContext);
  const history = useHistory();

  const [activeNav, setActiveNav] = useState(false);

  const activeNavHandler = () => {
    setActiveNav((prevMode) => !prevMode);
  };

  const searchHandler = (event) => {
    search.setKeyword(event.target.value);
  };

  const searchBtnHandler = () => {
    search.startSearchHandler("start");
  };

  const endSearchHandler = () => {
    search.setResultCount(0);
    search.startSearchHandler("end");
    console.log(search.resultCount);
  };

  return (
    <React.Fragment>
      <MobileNav
        activeNav={activeNav}
        activeNavHandler={activeNavHandler}
        className="mobile-nav-outer"
      />
      <header className="container px-0 nav-bar">
        <nav className="nav-content py-3">
          <Link to="/">
            <img src={logo} alt="Kenya Express Logo" />
          </Link>
          <ul className="navbar-links">
            <li className="header-link">
              <NavLink className="nav-link" to="/" exact>
                Home
                <div></div>
              </NavLink>
            </li>
            <li className="header-link">
              <NavLink className="nav-link" to="/about-us">
                About
                <div></div>
              </NavLink>
            </li>
            <li className="header-link">
              <NavLink className="nav-link" to="/services">
                Services
                <div></div>
              </NavLink>
            </li>
            <li className="header-link">
              <NavLink className="nav-link" to="/marketplace">
                Marketplace
                <div></div>
              </NavLink>
            </li>
            <li className="header-link">
              <NavLink className="nav-link" to="/testimonials">
                Testimonials
                <div></div>
              </NavLink>
            </li>
            <li className="header-link">
              <NavLink className="nav-link" to="/faqs">
                FAQs
                <div></div>
              </NavLink>
            </li>
            <li className="header-link">
              <NavLink className="nav-link" to="/contact">
                Contact
                <div></div>
              </NavLink>
            </li>
            <li>
              <div className="search-box">
                <input
                  type="text"
                  className={`search-input${search.keyword ? " active" : ""}`}
                  placeholder="Search"
                  value={search.keyword}
                  onChange={searchHandler}
                />
                <button type="text" className="btn" onClick={searchBtnHandler}>
                  {search.resultCount === 0 ? (
                    <BsSearch size={16} />
                  ) : (
                    <p className="h3 m-0 mt-2 badge badge-light">{search.resultCount}</p>
                  )}
                </button>
                {search.keyword ? (
                  <button
                    type="text"
                    className="btn close-btn"
                    onClick={endSearchHandler}
                  >
                    <IoCloseSharp size={20} />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </li>
            <li className="login-li-btn">
              {auth.token ? (
                <Link className="nav-link" to="/dashboard">
                  <BsFillPersonLinesFill className="login-icon" size={18} />
                  <span className="login-text">Account</span>
                </Link>
              ) : (
                <Link className="nav-link" to="/auth">
                  <BsFillPersonLinesFill className="login-icon" size={18} />
                  <span className="login-text">Login</span>
                </Link>
              )}
            </li>
            <li className="hamburger">
              <button className="nav-link" onClick={activeNavHandler}>
                <CgMenuRight size={30} />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};
export default Header;
