import React from "react";
import { Link } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";

import logo from "../../../shared/assets/logo.png";
import { AuthContext } from "../../../shared/context/auth-context";
import "./Header.css";
import NotificationsDropdown from "./NotificationsDropdown";
import ProfileDropdown from "./ProfileDropdown";

const Header = (props) => {
  return (
    <div className="row justify-content-between align-items-center m-0">
      <Link to="/">
        <img src={logo} alt="Kenya Express Logo" />
      </Link>
      <div className="profile-dropdown d-flex align-items-center">
        <NotificationsDropdown />
        <ProfileDropdown />
        <button className="btn portal-hamburger" onClick={props.show}>
          <CgMenuRight size={30} />
        </button>
      </div>
    </div>
  );
};
export default Header;
