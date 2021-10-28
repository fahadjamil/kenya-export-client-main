import React from "react";

import "./QAList.css";

const QAList = () => {
  return (
    <section className="container QA-list-section my-5" id="QAListSection">
      <div className="accordion" id="accordionExample">
        <section id="accordian" className="accordian-card">
          <button
            className="btn btn-block text-left collapsed accordian-button"
            id="headingone"
            type="button"
            data-toggle="collapse"
            data-target="#collapseone"
            aria-expanded="false"
            aria-controls="collapseone"
          >
            What is your mode on tranport?
          </button>
          <div
            id="collapseone"
            className="collapse"
            aria-labelledby="headingone"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              Customers have the option of sending cargo either by Sea or by
              Air.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="headingtwo"
            type="button"
            data-toggle="collapse"
            data-target="#collapsetwo"
            aria-expanded="false"
            aria-controls="collapsetwo"
          >
            How long does it take for goods to arrive in Kenya?
          </button>
          <div
            id="collapsetwo"
            className="collapse"
            aria-labelledby="headingtwo"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              By Sea, it will take 6 weeks from the departure date and by Air,
              it will take 5 business days. Dispatch is EVERY FRIDAY and goods
              can be collected or delivered in Nairobi the following Wednesday
              or at the latest Thursday's following departure.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn btn-block text-left collapsed accordian-button"
            id="headingthree"
            type="button"
            data-toggle="collapse"
            data-target="#collapsethree"
            aria-expanded="false"
            aria-controls="collapsethree"
          >
            How often is the service?
          </button>
          <div
            id="collapsethree"
            className="collapse"
            aria-labelledby="headingthree"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              By Sea we currently ship a single pallet on a monthly basis. By
              Air we send cargo once a week, please make sure we have received
              the goods by the Thursday in order to be shipped for Friday
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="headingfour"
            type="button"
            data-toggle="collapse"
            data-target="#collapsefour"
            aria-expanded="false"
            aria-controls="collapsefour"
          >
            Do you collect from my house?
          </button>

          <div
            id="collapsefour"
            className="collapse"
            aria-labelledby="headingfour"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              We can collect from clients doorstep, whether home or office.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="headingfive"
            type="button"
            data-toggle="collapse"
            data-target="#collapsefive"
            aria-expanded="false"
            aria-controls="collapsefive"
          >
            Can you deliver to my address in Kenya?
          </button>

          <div
            id="collapsefive"
            className="collapse"
            aria-labelledby="headingfive"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              We can deliver to any address in Kenya and there will be some
              extra fee for that, depending on the town or city. Please call our
              office on <br /> +44 (0) 7949 531 238 to arrange your delivery or to get
              more information.s
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="headingsix"
            type="button"
            data-toggle="collapse"
            data-target="#collapsesix"
            aria-expanded="false"
            aria-controls="collapsesix"
          >
            How much do you charge?
          </button>

          <div
            id="collapsesix"
            className="collapse"
            aria-labelledby="headingsix"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              Other than the stuff in our price list, the rest we charge £2.95
              per kilo + £20 handling fee by sea. By Air we charge £5.95 per
              kilo plus a £20 handling fee. These charges are inclusive of all
              customs charges.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="headingeight"
            type="button"
            data-toggle="collapse"
            data-target="#collapseeight"
            aria-expanded="false"
            aria-controls="collapseeight"
          >
            What is allowed to ship?
          </button>

          <div
            id="collapseeight"
            className="collapse"
            aria-labelledby="headingeight"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              By sea we ship anything and everything as long as it is legal.
              There are certain restrictions when it comes to air cargo.
              Restricted items (perfumes, sprays, laptops, mobile phones,
              weapons or anything flammable or hazardous) not allowed.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="headingnine"
            type="button"
            data-toggle="collapse"
            data-target="#collapsenine"
            aria-expanded="false"
            aria-controls="collapsenine"
          >
            How should i pack my stuff?
          </button>

          <div
            id="collapsenine"
            className="collapse"
            aria-labelledby="headingnine"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              Pack your parcels with care and securely either in carton boxes,
              suitcases, bags, plastic barrels as long as it’s safe. Make sure
              you have maximised all the space inside, you should also pay more
              attention to fragile items.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="headingten"
            type="button"
            data-toggle="collapse"
            data-target="#collapseten"
            aria-expanded="false"
            aria-controls="collapseten"
          >
            Do you offer packing service?
          </button>

          <div
            id="collapseten"
            className="collapse"
            aria-labelledby="headingten"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              Yes we can pack for you everything you want at a fee.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="heading11"
            type="button"
            data-toggle="collapse"
            data-target="#collapse11"
            aria-expanded="false"
            aria-controls="collapse11"
          >
            Can i pay in Kenya shillings?
          </button>

          <div
            id="collapse11"
            className="collapse"
            aria-labelledby="heading11"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              Yes you can deposit the equivalent amount as per prevailing CBK
              (Central Bank of Kenya) exchange rate into our Kenyan account or
              pay at the store. We also allow for payment to be made by the
              receiver in Kenya.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn btn-block text-left collapsed accordian-button"
            id="heading12"
            type="button"
            data-toggle="collapse"
            data-target="#collapse12"
            aria-expanded="false"
            aria-controls="collapse12"
          >
            How will i know that my cargo has arrived?
          </button>

          <div
            id="collapse12"
            className="collapse"
            aria-labelledby="heading12"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              On arrival we alert our clients by a text messages.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="heading13"
            type="button"
            data-toggle="collapse"
            data-target="#collapse13"
            aria-expanded="false"
            aria-controls="collapse13"
          >
            What happens after i have sent my goods?
          </button>

          <div
            id="collapse13"
            className="collapse"
            aria-labelledby="heading13"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              When the goods arrive in Nairobi, you will receive a text message
              to confirm arrival and a reference number which you forward to the
              receiver. The receiver then goes with ID and ref number for
              collection. We can also deliver to your door anywhere in Nairobi
              and environs, for deliveries upcountry we can arrange an approved
              third party courier company.
            </div>
          </div>
        </section>
        <section id="accordian" className="accordian-card">
          <button
            className="btn  btn-block text-left collapsed accordian-button"
            id="heading14"
            type="button"
            data-toggle="collapse"
            data-target="#collapse14"
            aria-expanded="false"
            aria-controls="collapse14"
          >
            How to Pay?
          </button>

          <div
            id="collapse14"
            className="collapse"
            aria-labelledby="heading14"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              You can deposit the equivalent amount as per prevailing CBK
              exchange rate into our Kenya Account or pay at the store. We also
              allow for payment to be made by the receiver in Kenya in our
              account.
              <br />
              <br />
              <b>
                Store Address / Head Office
                <br />
                Bank Account:
              </b>
              <br />
              Branch: Barclays Bank
              <br /> Acc: Kenexports Ltd.
              <br /> Sort Code: 202178
              <br /> Acc no: 10672556
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default QAList;
