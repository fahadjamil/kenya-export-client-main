import React from "react";
import { IoClose } from "react-icons/io5";

import "./AlertBar.css";

const WarningBar = (props) => {
  return (
    <div className={`alert-bar shadow-sm ${props.className} ${props.color}`}>
      <div className="d-flex align-items-center">
        {props.icon}
        <p>{props.children}</p>
      </div>
      <div className="d-flex justify-content-end">
        {props.button}
        {props.close && (
          <button className="btn p-0 pb-1" onClick={() => props.close(false)}>
            <IoClose size={20} className="p-0" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WarningBar;
