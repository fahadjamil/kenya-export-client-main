import React from "react";

import boxes from "../../../shared/assets/boxes.png";

const CollectionSection = () => {
  return (
    <section
      className="container collection-services__section"
      id="collectionServiceSection"
    >
      <div className="row align-items-center py-5">
        <div className="col-md-6">
          <img src={boxes} style={{ width: "100%" }} />
        </div>
        <div className="col-md-6">
          <h3 className="services__heading">Collection Services:</h3>
          <p>
            We offer collection services from client's doorstep and client can
            check whcih days we collect from their area. Just enter your post
            code and get information when we are collecting around your area.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
