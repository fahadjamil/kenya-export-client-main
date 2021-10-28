import React from "react";

const AirText = () => {
  return (
    <section
      className="container services-detail-text-section"
      id="airServiceDetailSection"
    >
      <div className="bg-white py-5 px-5">
        <div className="services-detail-text__heading m-0">
          <span className="bullet"></span>
          <h1 className="services__heading">Shipment Date</h1>
        </div>
        <p>
          There are certain items we are unable to ship due to various
          regulations, you can see in the bottom of this page. Please check full
          list of prohibited items, If you aren't sure whether we can ship a
          particular item, please email us before shipping it to our U.K.
          Address.
        </p>
        <div className="services-detail-text__heading">
          <span className="bullet"></span>
          <h1 className="services__heading">Cost</h1>
        </div>
        <p>
          Customers have the option of sending cargo by Air, price from £6.50
          per kilo + £20 handling fee.
        </p>
        <div className="services-detail-text__heading">
          <span className="bullet"></span>
          <h1 className="services__heading">Why use this service?</h1>
        </div>
        <p>
          This service is ideal for shipping large home or office appliances,
          industrial equipment, wholesale merchandise and such other bulky
          goods. You can ship home goods such as fridges, cookers and furniture,
          cost effectively via air freight shipping.
        </p>
        <div className="services-detail-text__heading">
          <span className="bullet"></span>
          <h1 className="services__heading">Prohibited Items</h1>
        </div>
        <div className="items pl-5 pt-3">
          <div className="row">
            <div className="col-md-4">
              <ul>
                <li>Adhesives</li>
                <li>Aerosols</li>
                <li>Airbags for Cars</li>
                <li>Alcohol</li>
                <li>Ammunition</li>
                <li>Camping stoves</li>
                <li>Cigrette lighters</li>
                <li>Cleaners &amp; solvents</li>
                <li>Compressed air/gas cylinders</li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul>
                <li>Fire extinguishers</li>
                <li>Fireworks</li>
                <li>Fuel containers</li>
                <li>Fuel flammable liquids</li>
                <li>Gasoline</li>
                <li>Helium</li>
                <li>Insecticides</li>
                <li>Narcotic (all illegal drugs) including khat</li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul>
                <li>Life jackets &amp; self inflating rafts</li>
                <li>Liquid bleach/chlorine</li>
                <li>Lithium batteries</li>
                <li>Furs/skins</li>
                <li>Firearms/swords</li>
                <li>Mobile phones</li>
                <li>Laptops</li>
                <li>Tablets</li>
                <li>Nail polish/vanish</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirText;
