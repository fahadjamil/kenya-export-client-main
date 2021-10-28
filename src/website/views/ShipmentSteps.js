import React, { useEffect } from "react";

import boxes from "../../shared/assets/boxes.png";
import "./ShipmentSteps.css";

const ShipmentSteps = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <div className="top-steps-section">
        <div className="container">
          <h3>Volumetric Weight:</h3>
          <p className="h6 text-dark">
            Apart from the items on the price list, we charge everything else at
            £2.95 per kilo + £20 handling fee. The price is inclusive of all
            customs charges, you only need to collect your cargo from our
            warehouse or have it delivered for an extra fee.
          </p>
          <h5 className="mt-4">Note:</h5>
          <p className="text-dark">
            We prefer customers to be responsible for the packaging of items
            being sent in suitable packaging material. Flat screen display
            (LCDs, Plasma’s and Computer Monitors) are specially packed and
            handled with care.
          </p>
          <p className="text-dark">
            We now would prefer for the items to be packed into suitable
            suitcases or strong boxes. We provide boxes for sale please contact
            us for purchases and delivery of boxes.
          </p>
          <p className="text-dark">
            PLEASE NOTE!! we are not sending used or new fridges, car batteries,
            fireworks, fire extinguishers or insecticides or any sort of
            chemicals BY SEA.
          </p>
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={boxes} style={{ width: "100%" }} />
            </div>
            <div className="col-md-6">
              <h3 className="mt-4">Consolidation &amp; Packaging:</h3>
              <p className="h6 text-dark">
                As a company, we understand that smart packaging techniques can
                lead to significant cost savings. We are happy to pass on those
                savings to you.
              </p>
              <p>
                Consolidation is a process by which we safely combine multiple
                products belonging to one customer into a single package,
                wherever possible.
              </p>
              <p>
                As an example, if you buy a pair of shoes, a shirt and a pair of
                headphones from three different online stores, each product will
                arrive at our U.K. warehouse in a separate package. Shipping
                them to your destination separately will result in unnecessarily
                high shipping charges. KenExports will therefore combine all
                three products into one package, wherever possible.
              </p>
              <p>
                <b>
                  This efficient repackaging could save you as much as 80% in
                  shipping costs. Package consolidation services are absolutely
                  free for all our customers.
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container shipmentSteps mt-3">
        <div className="heading">
          <p>By Sea</p>
          <p className="h6 text-dark">
            Apart from the items on the price list, we charge everything else at
            £2.95 per kilo + £20 handling fee. The price is inclusive of all
            customs charges, you only need to collect your cargo from our
            warehouse or have it delivered for an extra fee.
          </p>
        </div>
        <div className=" shipmentSteps-card-section">
          <div className="row">
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">1. Create an Account</h5>
                  <hr />
                  <p className="card-text">
                    Sign up with us in just a few simple steps, By clicking on
                    "Get a quote" start requesting quotes within minutes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 ">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">2. Request a Quote</h5>
                  <hr />
                  <p className="card-text">
                    Add product information into the product from above, wait to
                    receive a detailed price quotation.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">3. Fill Shipment Form</h5>
                  <hr />
                  <p className="card-text">
                    Fill Shipment From with details whether to request for
                    pickup or send it to our warehouse.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">4. We Ship &amp; Deliver</h5>
                  <hr />
                  <p className="card-text">
                    After receiving your goods, we'll send you the invoice,
                    dispatch and deliver to your destination within 40 to 45
                    days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="heading">
          <p>By Air</p>
        </div>
        <div className=" shipmentSteps-card-section">
          <div className="row">
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">1. Create an Account</h5>
                  <hr />
                  <p className="card-text">
                    Sign up with us in just a few simple steps, By clicking on
                    "Get a quote" start requesting quotes within minutes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 ">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">2. Request a Quote</h5>
                  <hr />
                  <p className="card-text">
                    Add product information into the product from above, wait to
                    receive a detailed price quotation.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">3. Fill Shipment Form</h5>
                  <hr />
                  <p className="card-text">
                    Fill Shipment From with details whether to request for
                    pickup or send it to our warehouse.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">4. We Ship &amp; Deliver</h5>
                  <hr />
                  <p className="card-text">
                    After receiving your goods, we'll send you the invoice,
                    dispatch and deliver to your destination within 40 to 45
                    days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="heading">
          <p>Buy &amp; Ship</p>
          <p className="h6 text-dark">
            Our customers in Kenya can now shop from UK online stores such as
            eBay, Amazon, Alibaba, Gumtree, Autotrader etc and have the goods
            delivered to your door. <br />
            Just use our office address as the shipping address, we then collect
            and prepare your order and have the goods shipped out to you pronto.
          </p>
          <p className="h6 text-dark mt-4">
            <span className="text-danger">
              <b>Address: </b>
            </span>
            KENEXPORTS LTD (your name) 27B PARK AVENUE ESTATE LUTON ENGLAND LU3
            3BP
          </p>
        </div>
        <div className=" shipmentSteps-card-section">
          <div className="row">
            <div className="col-md-3">
              <div className="card p-3 shadow ">
                <div className="card-body card-style">
                  <h5 className="card-title">1. Shop</h5>
                  <hr />
                  <p className="card-text">
                    Go to any online store like Ebay, Alibaba and order your
                    products.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 ">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">2. Order</h5>
                  <hr />
                  <p className="card-text">
                    Place the order and add address of Kenya Export as shipment
                    address.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">3. Collection</h5>
                  <hr />
                  <p className="card-text">
                    We'll collect your order and sent you the email for further
                    process.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow">
                <div className="card-body card-style">
                  <h5 className="card-title">4. Delivery</h5>
                  <hr />
                  <p className="card-text">
                    After successful process, we will ship your goods at your
                    place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ShipmentSteps;
