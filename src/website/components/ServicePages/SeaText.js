import React from "react";

const SeaText = () => {
  return (
    <section
      className="container services-detail-text-section"
      id="seaServiceDetailSection"
    >
      <div className="bg-white py-5 px-5">
        <div className="services-detail-text__heading m-0">
          <span className="bullet"></span>
          <h1 className="services__heading">Shipment Date</h1>
        </div>
        <p>
          Sea price is at £ 2.95 pkg plus £20 handling fee. Sea freight leaves
          after every 10days and it takes 6 weeks to arrive. We can collect or
          you can post to us.<br /> Address your package as <br />Your name + number<br />
          Kenexports ltd <br /> 27b Park Ave. Ind. Est<br /> Luton(city)<br /> Bedfordshire
          (County)<br /> Lu3 3bp (post code)
        </p>
        <div className="services-detail-text__heading">
          <span className="bullet"></span>
          <h1 className="services__heading">Cost</h1>
        </div>
        <p>
          Customers have the option of sending cargo by Sea in our 40ft
          Container charged from £2.95 per kilo + £20 handling fee.
        </p>
      </div>
    </section>
  );
};

export default SeaText;
