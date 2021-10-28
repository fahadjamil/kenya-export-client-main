import React from "react";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

import "./InnerHeadingFrame.css";

const InnerHeadingFrame = (props) => {
  return (
    <section className="container-fluid listing-view-frame">
      <div className="row">
        <div className="col-md-12">
          <div className="listing-heading-text w-100 d-flex align-items-center justify-content-end">
            {props.loading ? <LoadingSpinner small color='info' className="mr-2 mt-1" /> : props.icon}
            <h5 className="pt-4 pb-2 pr-4 pl-2">{props.heading}</h5>
          </div>
          <div className="listing-inner-wrapper">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerHeadingFrame;
