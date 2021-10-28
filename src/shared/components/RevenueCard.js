import React from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import "./RevenueCard.css";

const RevenueCard = (props) => {
  let days;

  if (props.duration === "today") days = 1;
  else if (props.duration === "week") days = 7;
  else if (props.duration === "month") days = 30;
  else days = 365;

  return (
    <div className="col-md-6 col-lg-3 mt-3">
      <div class="rev-card">
        <div className="rev-title d-flex justify-content-between">
          <div className="rev-heading">
            <h5>
              This <span className="text-capitalize">{props.duration}'s</span>{" "}
              Revenue
            </h5>
            <h3 className="font-weight-bold">750</h3>
          </div>
          <div className={`days-num ${props.duration}`}>
            <p>{days}</p>
          </div>
        </div>

        <div className="card-text">
          <div
            className={`text-item d-flex align-items-center ${props.difference}`}
          >
            {props.difference === "neutral" && <GoDash size={15} />}
            {props.difference === "profit" && <AiFillCaretUp size={15} />}
            {props.difference === "loss" && <AiFillCaretDown size={15} />}
            &nbsp; &nbsp;
            <p className="m-0">0,00%</p>
          </div>
          <div className={`text-item d-flex align-items-center mt-3`}>
            <p className="m-0">Show Graph</p> &nbsp; &nbsp;
            <FaLongArrowAltRight size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCard;
