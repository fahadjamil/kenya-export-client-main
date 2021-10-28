import React from "react";
import { FaArrowRight } from "react-icons/fa";

import img8 from "../../../shared/assets/s8.png";

const OnlineShopping = () => {
  return (
    <section className="online-shopping-section" id="onlineShoppingSection">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img className="image" src={img8} alt="Online Shopping" />
          </div>
          <div className="col-md-6">
            <h1>ONLINE SHOPPING</h1>
            <p>
              Our customers in Kenya can now shop from UK online stores such as
              eBay,
              <br /> Amazon, Alibaba, Gumtree, Autotrader etc and have the goods
              delivered to your <br />
              door. Just use our office address as the shipping address, we then
              collect and <br />
              prepare your order and have the goods shipped out to you pronto.
              <br />
              <b>Address:</b>
              <br />
              KENEXPORTS LTD (your name)
              <br /> 27B PARK AVENUE ESTATE
              <br /> LUTON <br />
              ENGLAND
              <br /> LU3 3BP
              <br />
              <i>
                Please call our office before placing your order on
                <b> +44 (0) 7949 531 238</b>
              </i>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineShopping;
