import React from "react";
import { GiCommercialAirplane, GiHomeGarage } from "react-icons/gi";

import kenyaFlag from "../../../shared/assets/kenya-flag.svg";
import ukFlag from "../../../shared/assets/uk-flag.svg";

import "./Timeline.css";

const Timeline = (props) => {
  return (
    <section className="timeline-section" id="timelineSection">
      <div className="timeline__inner">
        <div className="row">
          <div className="col my-3">
            <div className="timeline-start__circle">
              <div className="flag">
                <img src={ukFlag} />
              </div>
              <div className="timeline-circle__content">
                <div>{props.first_icon}</div>
                <p>{props.first_text}</p>
              </div>
            </div>
          </div>

          <div className="col my-3 d-flex align-items-center justify-content-center">
            <div className="path">
              <div className="path-text">
                <p>Estimated Time</p>
                <p>
                  {props.time1}
                  <br />
                  {props.time2}
                </p>
              </div>
              {props.second_icon ? (
                <React.Fragment>
                  <span></span>
                  <span></span>
                  <span></span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </React.Fragment>
              )}
            </div>
          </div>

          {props.second_icon && (
            <React.Fragment>
              <div className="col my-3">
                <div className="timeline-start__circle">
                  <div className="flag">
                    <img src={ukFlag} />
                  </div>
                  <div className="timeline-circle__content">
                    <div>{props.second_icon}</div>
                    <p>{props.second_text}</p>
                  </div>
                </div>
              </div>

              <div className="col my-3 d-flex align-items-center justify-content-center">
                <div className="path">
                  <div className="path-text">
                    <p>Estimated Time</p>
                    <p>
                      {props.time3}
                      <br />
                      {props.time4}
                    </p>
                  </div>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </React.Fragment>
          )}

          <div className="col my-3">
            <div className="timeline-end__circle">
              <div className="flag">
                <img src={kenyaFlag} />
              </div>
              <div className="timeline-circle__content">
                <div>{props.third_icon}</div>
                <p>{props.third_text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
