import React from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { RiChatQuoteFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";

import Calculator from "../../../website/components/Home/Calculator";
import IconCard from "../../../shared/components/IconCard";
import "./ServicesPages.css";

const AirSteps = () => {
  return (
    <section
      className="container services-steps-section"
      id="airServiceStepsSection"
    >
      <div className="h5 text-center text-muted py-4">
        <p>
          Looking to ship heavy items? Our Air freight service allows you to do
          so cost effectively.
        </p>
        <small>
          Get an instant quote below. Customers have the option of sending cargo
          by Air in our pallet, charged from £6.50 per kilo + £20 handling fee.
          Delivery is within 5 days. We airfreight every Friday and collection
          cutoff is Thursday. For instant real-time updates.
        </small>
      </div>

      <Calculator className="pb-5" red mode="AIR" />

      <h1 className="services__heading mt-0">How it works</h1>
      <div className="row mb-3">
        <div className="col-md-6 mt-3">
          <IconCard
            corner="Step 01"
            icon={<BsFillShieldLockFill size={60} />}
            heading="Create an Account"
            text="Sign up with us in just a few simple steps, By clicking on 'Get a quote' start requesting quotes within minutes."
          />
        </div>
        <div className="col-md-6 mt-3">
          <IconCard
            corner="Step 02"
            icon={<RiChatQuoteFill size={60} />}
            heading="Request a Quote"
            text="Add product information into the product form above, wait to receive a detailed price quotation."
          />
        </div>
        <div className="col-md-6 mt-3">
          <IconCard
            corner="Step 03"
            icon={<IoDocumentText size={60} />}
            heading="Fill Shipment Form"
            text="Fill Shipment Form with details whether to request for pickup or send it to our warehouse."
          />
        </div>
        <div className="col-md-6 mt-3">
          <IconCard
            corner="Step 04"
            icon={<FaTruck size={60} />}
            heading="We Ship &amp; Deliver"
            text="After receiving your goods, we'll send you an invoice, dispatch and deliver to your destination within 5 business (working) days."
          />
        </div>
      </div>
    </section>
  );
};

export default AirSteps;
