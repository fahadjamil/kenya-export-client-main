import React from "react";
import { Link } from "react-router-dom";

import "./BigGradientCard.css";

const DashboardCard = (props) => {
  return (
    <div className="col-md-6 col-lg-4 col-sm-12 dashboard-gradient-card-outer">
      <div className={`dashboard-gradient-card ${props.color}`}>
        <div className="gradient-card-inner-icon">
          <div className="bg-icon-div">{props.icon}</div>
          <div className="d-flex align-items-center gradient-card-heading">
            <div>{props.icon}</div>
            <p className="m-0">{props.heading}</p>
          </div>
          <div className="row">
            <div className="col-6 pr-0">
              <div className="info-cell">
                <p>{props.one.name}</p>
                <div>
                  <h1>{props.one.value}</h1>
                  <Link to={props.one.link}>
                    {/* <small>More Info</small> */}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 pl-0">
              <div className="info-cell">
                <p>{props.two.name}</p>
                <div>
                  <h1>{props.two.value}</h1>
                  <Link to={props.two.link}>
                    {/* <small>More Info</small> */}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 pr-0  ">
              <div className="info-cell">
                <p>{props.three.name}</p>
                <div>
                  <h1>{props.three.value}</h1>
                  <Link to={props.three.link}>
                    {/* <small>More Info</small> */}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 pl-0">
              <div className="info-cell">
                <p>{props.four.name}</p>
                <div>
                  <h1>{props.four.value}</h1>
                  <Link to={props.four.link}>
                    {/* <small>More Info</small> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardCard;
