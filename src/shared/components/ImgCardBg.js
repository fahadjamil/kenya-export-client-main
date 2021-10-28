import React from "react";

import "./ImgCardBg.css";

const Background = (props) => {
  return (
    <div className="contain">
      <div className="contain-inner">
        <div className={`row main-card ${props.size}`}>{props.children}</div>
      </div>
    </div>
  );
};

export default Background;
