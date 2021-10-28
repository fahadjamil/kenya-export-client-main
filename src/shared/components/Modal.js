import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { IoCloseSharp } from "react-icons/io5";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
  const content = (
    <div
      className={`modal ${props.className} ${props.small ? "small" : ""}`}
      style={{ top: `${props.top ? props.top : "18vh"}` }}
    >
      {props.headerContent && (
        <div className="border-bottom d-flex align-items-center justify-content-between py-3 px-4">
          <h5 className="font-weight-bold m-0">{props.headerContent}</h5>
          <button className="border-0 p-0 btn" onClick={props.onCancel}>
            <IoCloseSharp size={25} className="text-secondary" />
          </button>
        </div>
      )}
      <div className='modal_body__overflow'>{props.children}</div>
      {props.footerContent && (
        <div className="border-top pt-3 pb-3 pr-4 text-right">
          {props.footerContent}
        </div>
      )}
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
