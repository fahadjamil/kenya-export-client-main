import React from "react";

import "./TooltimImg.css";

const TooltipImg = (props) => {
  return (
    <span className="tooltip-status-div" key={props.index}>
      <span className="status-text">{props.children}</span>
      <img
        className="tooltip-status-icon"
        src={props.src}
        width={props.width}
        height={props.height}
      />
      <span className="tooltip-status-text">{props.children}</span>
    </span>
  );
};

export default TooltipImg;
