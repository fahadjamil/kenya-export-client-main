import React from "react";
import { Link } from "react-router-dom";

import "./ProductCard.css";

const ProductCard = (props) => {
  return (
    <div className={`product-card ${props.type}`}>
      <img
        className="product-card-image"
        src={props.imgSrc}
        alt="Service Card 01"
      />
      <div className="product-card-text">
        <div>
          <h4>{props.name}</h4>
          {props.description ? <p>{props.description}</p> : ""}
        </div>
        {props.btn ? (
          <Link
            to={props.btn.link}
            className="btn btn-outline-danger btn-sm rounded-pill px-3"
          >
            {props.btn.name}
          </Link>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {props.price ? (
          <div className="product-price">
            <p className="product-price-text">{props.price}</p>
          </div>
        ) : (
          ""
        )}
        {props.icon ? <div className="product-icon">{props.icon}</div> : ""}
      </div>
    </div>
  );
};

export default ProductCard;
