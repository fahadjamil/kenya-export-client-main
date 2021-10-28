import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import Card from "../../../shared/components/Card";
import "./CollectionUpdateItem.css";

const CollectionUpdateItem = (props) => {
  return (
    <div className="collection-update-item col-md-6 col-lg-4">
      <Card>
        <div className="pl-3 pr-4">
          <div className="d-flex justify-content-start align-items-baseline pl-2">
            <p className="text-secondary m-0">Postcode:</p>
            <p className="m-0 pl-1 h6 m-0 postcode">{props.data.postcode}</p>
          </div>
          <div className="d-flex justify-content-start align-items-baseline pb-2 pl-2">
            <p className="text-secondary">Address:</p>
            <p className="m-0 pl-1 h6 postcode">{props.data.address}</p>
          </div>
          <div className="d-flex align-items-center">
            <BsClockHistory className="ml-2 mr-2" size={24} />
            <div className="flex-column">
              {props?.data?.time?.map((data, index) => (
              
                <h6 key={index} className="m-0 d-flex pr-2">
                  <span>{data?.timestamp?.split("T")[1]?.split(".")[0]}</span>
                  <span>
                    &nbsp;&nbsp;&nbsp;{data?.timestamp?.split("T")[0]}
                  </span>
                  <button
                    className="btn p-0 m-0 d-flex align-items-center"
                    onClick={() =>
                      props.openUpdateModal(
                        data?.id,
                        props.data.postcode,
                        data?.timestamp,
                        props?.data?.address
                      )
                      
                    }
                  >
                    <FaEdit size={15} className="ml-2 mb-1" />
                  </button>
                </h6>
              )) }
            </div>
            {/* <div className="d-flex align-items-baseline">
              <h4 className="m-0 pr-2">{props.data.time}</h4>
              <h5 className="m-0">{props.data.date}</h5>
            </div> */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CollectionUpdateItem;
