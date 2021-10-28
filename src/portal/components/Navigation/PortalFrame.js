import React, { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import "./PortalFrame.css";

const PortalFrame = (props) => {
  const [showModileNav, setShowMobileNav] = useState(false);

  const sidebarHandler = () => {
    setShowMobileNav(!showModileNav);
  }

  return (
    <React.Fragment>
      <div className="portal-header">
        <Header show={sidebarHandler} />
      </div>
      <div className="portal-content">
        <div className={`portal-sidebar ${showModileNav ? "show" : "hide"}`}>
          <Sidebar />
        </div>
        <div className="portal-body">{props.children}</div>
      </div>
    </React.Fragment>
  );
};

export default PortalFrame;
