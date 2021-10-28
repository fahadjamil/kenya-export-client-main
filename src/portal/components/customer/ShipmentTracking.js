import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BiStats } from "react-icons/bi";
import { IoWarning } from "react-icons/io5";

import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import AlertBar from "../../../shared/components/AlertBar";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { shipmentStatus } from "../../../shared/utils/statuses";
import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";
import "./ShipmentTracking.css";

const ShipmentTracking = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [shipmentLogs, setShipmentLogs] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [trackingId, setTrackingId] = useState("");

  console.log(trackingId);

  const getShipmentTrackingApi = async (event) => {
    if (!trackingId) {
      setErrorText("Please write a shipment ID to track your shipment.");
      return;
    }
    setErrorText("");
    try {
      const response = await sendRequest(
        `shipment/get_shipment_tracking/${trackingId}`
      );
      console.log(response.data);
      setShipmentLogs(response.data);
    } catch (error) {
      setErrorText(error.response.data.message);
    }
  };

  return (
    <InnerHeadingFrame
      heading="Shipment Tracking"
      icon={<BiStats className="mt-2" size={45} />}
    >
      {errorText && (
        <AlertBar
          className="mx-0"
          icon={<IoWarning size={20} />}
          close={setErrorText}
        >
          {errorText}
        </AlertBar>
      )}
      <div className="tracking-search-section shadow">
        <div className="row tracking-search-input">
          <div className="col-md-9 pr-md-0">
            <input
              type="text"
              className="w-100"
              placeholder="Write your tracking ID..."
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button className="w-100" onClick={getShipmentTrackingApi}>
              {isLoading ? <LoadingSpinner xsmall color="info" /> : "Search"}
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        {shipmentLogs?.shipmentLog?.map((data, index) => (
          <div key={index} className="col-lg-2 col-md-3 col-sm-6 mb-5">
            <div className="status-card bg-white rounded shadow text-center">
              {shipmentStatus.map((src, i) =>
                src?.value === data?.shipmentStatus?.status ? (
                  <React.Fragment>
                    <img src={src.src} className="mb-2" width="50px" />
                    <p className="name">{src.name}</p>
                  </React.Fragment>
                ) : (
                  ""
                )
              )}
              <div className="status-card-bottom">
                <p className="date">{data?.timestamp?.split("T")[0]}</p>
                <p className="time">
                  {data?.timestamp?.split("T")[1].split(".")[0]}
                </p>
                {auth.role === "admin" && (
                  <React.Fragment>
                    <span>UPDATED BY:</span>
                    <Link
                      className="user"
                      to={`/user-detail/${data?.employee?.id}`}
                    >
                      {data?.employee?.name}
                    </Link>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </InnerHeadingFrame>
  );
};

export default ShipmentTracking;
