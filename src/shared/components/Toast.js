import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import Modal from "./Modal";
import "./Toast.css";

const Toast = (props) => {
  const showHandler = () => {
    props.setShow((prevMode) => !prevMode);
  };
//
  useEffect(() => {
    if (props.show) {
      setTimeout(() => {
        props.setShow(false);
      }, props.time || 3000);
    }
  }, [props.show]);

  const seconds =
    props.time === "500"
      ? "half"
      : props.time === "1000"
      ? "one"
      : props.time === "1500"
      ? "two"
      : props.time === "2000"
      ? "three"
      : props.time === "2500"
      ? "four"
      : props.time === "3000"
      ? "five"
      : "three";

  return (
    <Modal small show={props.show}>
      <div className={`timer-modal ${props.color}`}>
        {props.closeBtn && (
          <button className="close-btn" onClick={showHandler}>
            &#x2715;
          </button>
        )}
        <i>{props.icon}</i>
        <p>{props.text}</p>
        <div className="progress-bar">
          <hr className="base-bar" />
          <hr className={`color-bar ${seconds}`} />
        </div>
        {props.subText && <small>{props.subText}</small>}
      </div>
    </Modal>
  );
};

export default Toast;
