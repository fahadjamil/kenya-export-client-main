import React, { useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

import cardlogo from "../../../shared/assets/client-logo.png";
import "./TestimonialCards.css";

const TestimonialCards = () => {
  const buttonR = useRef();
  const buttonL = useRef();
  const box = useRef();

  const scrolRight = () => {
    box.current.scrollLeft -= 450;
  };
  const scrolLeft = () => {
    box.current.scrollLeft += 450;
  };

  return (
    <section className="container-fluid testimonial-card-section" id="testimonialCardsSection">
      <div className="card-section">
        <div className="scroll-menu " ref={box}>
          <div className="scroll-card mx-2">
            <h1 className="card-heading">Njoki Githua</h1>
            <p className="card-heading-detail">Reviewed Kenya Exports</p>
            <p className="card-stars">
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
            </p>
            <p className="card-paragraph">
              Very convenient and reliable, got my
              <br />
              stuff on time and in perfect
              <br /> condition.Thank you kenya exports.
            </p>
            <img className="card-logo" src={cardlogo} />
          </div>
          <div className="scroll-card mx-2">
            <h1 className="card-heading">Masha Salim </h1>
            <p className="card-headingdetail">Reviewed Kenya Exports</p>
            <p className="card-stars">
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
            </p>
            <p className="card-paragraph">
              Very efficient and reliable team kenex <br />
              exports guys are,keep up the gud job.
            </p>
            <img className="card-logo" src={cardlogo} />
          </div>
          <div className="scroll-card mx-2">
            <h1 className="card-heading">Mukami Kigamba </h1>
            <p className="card-heading-detail">Reviewed Kenya Exports</p>
            <p className="card-stars">
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
            </p>
            <p className="card-paragraph">
              Efficient and reliable service keep it up
              <br /> guys.
            </p>
            <img className="card-logo" src={cardlogo} />
          </div>
          <div className="scroll-card mx-2">
            <h1 className="card-heading">Lillian Munyui</h1>
            <p className="card-heading-detail">Reviewed Kenya Exports</p>
            <p className="card-stars">
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
            </p>
            <p className="card-paragraph">
              Reliable and friendly you are the best.{" "}
            </p>
            <img className="card-logo" src={cardlogo} />
          </div>
          <div className="scroll-card mx-2">
            <h1 className="card-heading">Sally Wanjiru</h1>
            <p className="card-heading-detail">Reviewed Kenya Exports</p>
            <p className="card-stars">
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
              <AiFillStar size="30" />
            </p>
            <p className="card-paragraph">
              I highly recommend this to people
              <br /> who has never used them. We have
              <br /> used them several times &amp; their
              <br /> services are very good. Try them &amp;
              <br /> you'll never regret.
            </p>
            <img className="card-logo" src={cardlogo} />
          </div>
        </div>
        <button
          className="btn arrow-left"
          ref={buttonL}
          onClick={scrolRight}
          id=""
          type="button"
        >
          <AiOutlineLeft size="40" />
        </button>
        <button
          className="btn arrow-right"
          ref={buttonR}
          onClick={scrolLeft}
          type="button"
        >
          <AiOutlineRight size="40" />
        </button>
      </div>
    </section>
  );
};

export default TestimonialCards;
