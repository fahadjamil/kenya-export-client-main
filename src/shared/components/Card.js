import React from "react";

import "./Card.css";

const Card = (props) => {
  return (
    <div
      className={`custom-card-wrapper shadow ${props.className} ${
        props.width || ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
