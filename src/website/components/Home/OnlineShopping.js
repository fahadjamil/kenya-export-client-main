import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import groupImage from "../../../shared/assets/group.png";
import "./OnlineShopping.css";

const OnlineShopping = () => {
  return (
    <section className="online-shopping-section" id="onlineShoppingSeciton">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img className="image" src={groupImage} />
          </div>
          <div className="col-md-6">
            <h1>ONLINE SHOPPING</h1>
            <p>
              Our customers in Kenya can now shop from UK online stores such as
              eBay, Amazon, Alibaba, Gumtree, Autotrader etc and have the goods
              delivered to your door. Just use our office address as the
              shipping address, we then collect and prepare your order and have
              the goods shipped out to you pronto.
            </p>
            <button className="arrow-hover-btn">
              <Link to="/shipment-steps">
                <span className="apply-btn-text">SHOP NOW</span>
                <FaArrowRight siz={10} className="arrow-btn-icon" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OnlineShopping;
