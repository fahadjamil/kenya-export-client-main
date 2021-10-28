import React from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { RiChatQuoteFill } from "react-icons/ri";
import { GoDeviceDesktop } from "react-icons/go";
import { FaTruck } from "react-icons/fa";

import IconCard from "../../../shared/components/IconCard";
import "./ServicesPages.css";

const BuynShipSteps = () => {
  return (
    <section className="container services-steps-section">
      <div className="h5 text-center text-muted py-4">
        <p>
          Use this service if you would like to Shop from online store and get
          delivered at Kenya while using our shipping service from UK, You can
          shop online with peace of mind because now you don't have to hassle
          for delivery at Kenya.
        </p>
        <small>
          Go ahead and shop online from any online store which ever product you
          want. After receiving your order at our warehouse, We will get back to
          you within 24 to 48 hours with the total cost of delivering the order
          to you, including customs clearance and shipping fees. we will give
          you a tracking ID and you can track your order at your ease. Start
          shopping at any UK online store and ship to Kenya at the best rates
          available.
        </small>
      </div>
      <h1 className="services__heading">How it works</h1>
      <div className="row mb-3">
        <div className="col-md-6 mt-3">
          <IconCard
            corner="Step 01"
            icon={<BsFillShieldLockFill size={60} />}
            heading="Shop"
            text="Go to any online store like Ebay, Alibaba and order your products."
          />
        </div>
        <div className="col-md-6 mt-3">
          <IconCard
            corner="Step 02"
            icon={<RiChatQuoteFill size={60} />}
            heading="Order"
            text="Place the order and set Kenya Exports address as shipment address."
          />
        </div>
        <div className="col-md-6 mt-3">
          <IconCard
            corner="Step 03"
            icon={<GoDeviceDesktop size={60} />}
            heading="Collection"
            text="We'll collect your order and sent you the email with the total cost of delivering to Kenya including customs clearance and shipping fees. You can select shipment mode from there so that we can deliver as soon as possible."
          />
        </div>
        <div className="col-md-6 mt-3">
          <IconCard
            corner="Step 04"
            icon={<FaTruck size={60} />}
            heading="Delivery"
            text="After successful process, we will ship your goods at your place."
          />
        </div>
      </div>
    </section>
  );
};

export default BuynShipSteps;
