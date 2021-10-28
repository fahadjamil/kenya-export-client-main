import React from "react";

import "./IconCard.css";

const IconCard = (props) => {
  return (
    <div className={`${props.className} custom-icon-card`}>
      <p className="custom-icon-card__corner-text">{props.corner}</p>
      <div className="custom-icon-card__icon">{props.icon}</div>
      <p className="custom-icon-card__heading">{props.heading}</p>
      <p className="custom-icon-card__text">{props.text}</p>
    </div>
  );
};

export default IconCard;
