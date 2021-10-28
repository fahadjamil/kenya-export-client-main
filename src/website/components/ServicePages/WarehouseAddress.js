import React from "react";

const WarehouseAddress = () => {
  return (
    <section
      className="warehouse-address-section"
      id="warehhouseAddressSection"
    >
      <div className="container">
        <div className="warehouse-address__inner col-md-8 offset-md-2">
          <h1 className="address__heading">Our Warehouse Address</h1>
          <div className="row user-detail">
            <div className="col-md-6 warehouse-address__fields">
              <p>
                Your Full Name:
                <br />
                <span>Johnathan Doe</span>
              </p>
            </div>
            <div className="col-md-6 warehouse-address__fields">
              <p>
                Your Phone no:
                <br />
                <span>0044XXXXXXXXXX</span>
              </p>
            </div>
            <div className="col-md-12 warehouse-address__fields">
              <p>
                Address:
                <br />
                <span>
                  27b Park Avenue Industrial Estate, Luton, Bedforshire, LU3
                  3BP.
                </span>
              </p>
            </div>
            <div className="col-md-12">
              <p className="warehouse-address__description">
                When shipping goods to our U.K. Address, the name and the phone
                number on the package should be those of the Kenya Exports
                account holder. If the seller or vendor requires a phone number
                in order to process your order, provide them with our Package
                Ordering Phone number: <b>+254 (0) 711 806 768.</b> Our U.K.
                warehouse will open and inspect the contents of your package
                before shipping as is required by regulations.
              </p>
            </div>
          </div>
          <p className="warehouse-query">
            <i>For any question call us or email</i>
          </p>
          <div className="row">
            <div className="col-md-12 warehouse-address__fields">
              <p className="m-0">
                Email: &nbsp;
                <span>info@kenyaexports.co.uk</span>
              </p>
            </div>
            <div className="col-md-12 warehouse-address__fields">
              <p className="m-0">
                Phone: &nbsp;
                <span>01582561029,07398105110, 07474951195</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseAddress;
