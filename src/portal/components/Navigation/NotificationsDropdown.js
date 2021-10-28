import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiNotification2Fill } from "react-icons/ri";

import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import "./Dropdown.css";

const Notifications = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [pendingBuyNShip, setPendingBuyNShip] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [pendingTransactionCheck, setPendingTransactionCheck] = useState(0);

  const getPendingBuyNShipShipmentApi = async () => {
    try {
      const response = await sendRequest(
        `shipment/get_pending_buynship/${auth.userId}`
      );
      setPendingBuyNShip(response.data.length);
    } catch (error) {}
  };

  const getPendingPaymentShipmentApi = async () => {
    try {
      const response = await sendRequest(
        `shipment/pending_payment/${auth.userId}`
      );
      setPendingPayments(response.data.length);
    } catch (error) {}
  };

  const getTransactionCheckApi = async () => {
    try {
      const response = await sendRequest(`shipment/pending_transactions`);
      setPendingTransactionCheck(response.data.length);
    } catch (error) {}
  };

  useEffect(() => {
    getPendingBuyNShipShipmentApi();
    getPendingPaymentShipmentApi();
    getTransactionCheckApi();
  }, []);

  return (
    <React.Fragment>
      {auth.role === "customer" && (
        <div className="dropdown">
          <button
            className="btn notification-icon dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {pendingBuyNShip + pendingPayments !== 0 && (
              <span className="notification-icon-text">
                {pendingBuyNShip + pendingPayments}
              </span>
            )}
            <RiNotification2Fill size={26} />
          </button>
          <div
            className="notification dropdown-menu dropdown-menu-right shadow"
            style={{
              width: "300px",
              transform: "translate3d(-180px, 60px, 0px)",
            }}
            aria-labelledby="dropdownMenuButton"
          >
            <Link to="/shipment-list/notification-buynship">
              <div>
                <p className="m-0">Buy-n-Ship Shipments</p>
                <span>Please complete new buy-n-ship shipment.</span>
              </div>
              <div className="notification-badge">{pendingBuyNShip}</div>
            </Link>
            <Link to="/shipment-list/notification-payment">
              <div>
                <p className="m-0">Pending Payments</p>
                <span>Payment is pending for the shipment.</span>
              </div>
              <div className="notification-badge">{pendingPayments}</div>
            </Link>
          </div>
        </div>
      )}

      {(auth.role === "employee" || auth.role === "admin") && (
        <div className="dropdown">
          <button
            className="btn notification-icon dropdown-toggle mr-2"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {pendingTransactionCheck !== 0 && (
              <span className="notification-icon-text">
                {pendingTransactionCheck}
              </span>
            )}
            <RiNotification2Fill size={26} />
          </button>
          <div
            className="notification-dropdown-menu dropdown-menu dropdown-menu-right shadow"
            style={{
              width: "300px",
              transform: "translate3d(-180px, 50px, 0px)",
            }}
            aria-labelledby="dropdownMenuButton"
          >
            <Link to="/shipment-list/notification-transaction">
              <div>
                <p className="m-0">Pending Payments</p>
                <span>Check the transaction Ids.</span>
              </div>
              <div className="notification-badge">
                {pendingTransactionCheck}
              </div>
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Notifications;
