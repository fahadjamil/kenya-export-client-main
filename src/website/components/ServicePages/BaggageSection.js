import React from "react";

import baggage from "../../../shared/assets/baggage.png";

const BaggageSection = () => {
  return (
    <section
      className="container baggage-services__section"
      id="baggageServiceSection"
    >
      <div className="row align-items-center py-5">
        <div className="col-md-5">
          <img src={baggage} style={{ width: "100%" }} />
        </div>
        <div className="col-md-7">
          <h3 className="services__heading">Excess Baggage</h3>
          <p>
            There is a lot of cost associated to excess baggae with airlines. If
            you want to save it then contact us, When you're willing to send
            some excess baggage by using our services just call us at{" "} <br />
            <b>+44 (0) 7949 531 238</b> or email us at{" "}
            <b>info@kenyaexports.co.uk</b>
            <br />
            <br />
            <b className="text-danger">Dispatch Center:</b>
            <br />
            Unit 27B, LU3 3BP
          </p>
        </div>
      </div>
    </section>
  );
};

export default BaggageSection;
