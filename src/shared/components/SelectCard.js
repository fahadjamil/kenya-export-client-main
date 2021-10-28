import React from "react";
import { HiOutlinePlus, HiMinus } from "react-icons/hi";

import "./SelectCard.css";

const SelectCard = (props) => {
  return (
    <div className={`selection-card d-flex flex-column justify-content-between`}>
      <div>
        {props.img && <img src={props?.img} className="" />}
        <p className="selection-card-name">{props?.name}</p>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div className="selection-card-btns">
          <button>
            <HiMinus
              size={20}
              onClick={() => props?.setQuantity(props?.id, "sub")}
            />
          </button>
          <p className="selection-card-quantity" id={props?.id}>
            {props?.quantity}
          </p>
          <button>
            <HiOutlinePlus
              size={23}
              onClick={() => props?.setQuantity(props?.id, "add")}
            />
          </button>
        </div>
        <p className="selection-card-price">£ {props?.price}</p>
      </div>
    </div>
  );
};

export default SelectCard;
