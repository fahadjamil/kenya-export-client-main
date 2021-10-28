import React from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { RiChatQuoteFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";
import IconCard from "../../../shared/components/IconCard";
import "./DoorDelievery.css";

const DoorDelivery = () => {
  return (
    <section className="container">
      <div className="row">
        <div className="col-md-12">
          <p className="delivery-steps pt-3 pb-3">
            Please follow the steps given below to apply for "Door to Door"
            Delievery
          </p>
        </div>
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
            text="Add product information into the product from above, wait to receive a detailed price quotation."
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
            icon={<BsFillCollectionFill size={60} />}
            heading="Wait for collection"
            text="Enter your area postcode in the given above field and wait for the Kenya Exports team to arrive at the specified time until it is collected."
          />
        </div>
        <div className="col-md-6 mt-3">
          <IconCard
            corner="Step 05"
            icon={<FaTruck size={60} />}
            heading="We Ship &amp; Deliver"
            text="After receiving your goods, we'll send you an invoice, dispatch and deliver to your destination within 5 business (working) days."
          />
        </div>
      </div>
    </section>
  );
};

export default DoorDelivery;
