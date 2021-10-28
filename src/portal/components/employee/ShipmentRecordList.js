import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RiShipFill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { FaPlaneDeparture } from "react-icons/fa";

import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";
import requested from "../../../shared/assets/status_icons/requested_info.png";
import picked from "../../../shared/assets/status_icons/picked_info.png";
import warehouse from "../../../shared/assets/status_icons/warehouse_info.png";
import transit from "../../../shared/assets/status_icons/transit_info.png";
import nairobi from "../../../shared/assets/status_icons/nairobi_info.png";
import invoiced from "../../../shared/assets/status_icons/invoiced_info.png";
import delivered from "../../../shared/assets/status_icons/delivered_info.png";
import paid from "../../../shared/assets/status_icons/paid_info.png";
import { shipmentStatus, paidStatus } from "../../../shared/utils/statuses";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Card from "../../../shared/components/Card";
import Table from "../../../shared/components/Table";
import "../customer/ShipmentRecordList.css";

const ShipmentRecordList = () => {
  const auth = useContext(AuthContext);
  const shipmentType = useParams().type;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [shipmentList, setShipmentList] = useState(null);

  const tableRouting = {
    route: "/shipment-detail/",
    idKey: "id",
  };

  const tableData = [
    {
      type: "text",
      name: "Shipment Code",
      key: "shipmentCode",
    },
    {
      type: "date",
      name: "Order Date",
      key: "orderDate",
    },
    {
      type: "text",
      name: "Place of Transaction",
      key: "placeOfTransaction",
      style: "italic",
    },
    {
      type: "text",
      name: "Place of Destination",
      key: "placeOfDestination",
      style: "italic",
    },
    {
      type: "status_icon",
      name: "Payment Status",
      key: "paid",
      options: paidStatus,
    },
    {
      type: "status",
      name: "Status",
      key: "shipmentStatus",
      subkey: "status",
      options: shipmentStatus,
    },
  ];

  const shipmentFilters = [
    // {
    //   name: "Paid",
    //   key: "paid",
    //   value: true,
    // },
    // {
    //   name: "Unpaid",
    //   key: "paid",
    //   value: false,
    // },
    {
      type: "radio",
      name: "Shipment Status",
      key: "shipmentStatus",
      subkey: "status",
      options: [
        {
          name: "Requested",
          value: "requested",
        },
        {
          name: "Picked Up",
          value: "picked_up",
        },
        {
          name: "At Warehouse",
          value: "at_warehouse",
        },
        {
          name: "In Transit",
          value: "in_transit",
        },
        {
          name: "In Nairobi",
          value: "in_nairobi",
        },
        {
          name: "Invoiced",
          value: "invoiced",
        },
        {
          name: "Delivered",
          value: "delivered",
        },
      ],
    },
    {
      type: "radio",
      name: "Payment",
      key: "paid",
      options: [
        {
          name: "Paid",
          value: true,
        },
        {
          name: "Unpaid",
          value: false,
        },
      ],
    },
    {
      type: "search",
      name: "Shipment Code",
      key: "shipmentCode",
    },
    {
      type: "date",
      name: "Date",
      key: "orderDate",
    },
  ];

  const getShipmentApi = async () => {
    try {
      const response = await sendRequest(
        `shipment/shipment_type/${shipmentType.toUpperCase()}`
      );
      console.log(response.data.shipments);
      setShipmentList(response.data.shipments);
    } catch (error) {}
  };

  const getTransactionCheckApi = async () => {
    try {
      const response = await sendRequest(`shipment/pending_transactions`);
      console.log(response.data);
      setShipmentList(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (shipmentType === "notification-transaction") {
      getTransactionCheckApi();
    } else {
      getShipmentApi();
    }
  }, [shipmentType]);

  return (
    <InnerHeadingFrame
      icon={
        shipmentType === "notification-buynship" ||
        shipmentType === "buynship" ? (
          <IoMdCart className="mt-2" size={40} />
        ) : shipmentType === "notification-payment" ? (
          <MdPayment className="mt-2" size={40} />
        ) : shipmentType === "ship" ? (
          <RiShipFill className="mt-3" size={45} />
        ) : (
          <FaPlaneDeparture className="mt-3" size={45} />
        )
      }
      heading={
        shipmentType === "notification-buynship"
          ? "New Buy-n-Ship"
          : shipmentType === "notification-payment"
          ? "Pending Payments"
          : shipmentType === "buynship"
          ? "Buy-n-Ship Shipment"
          : `Shipment by ${shipmentType === "ship" ? "Sea" : "Plane"}`
      }
      loading={isLoading}
    >
      {shipmentList && (
        <Table
          meta={tableData}
          setData={setShipmentList}
          data={shipmentList.reverse()}
          routing={tableRouting}
          error={error}
          filters={shipmentFilters}
        ></Table>
      )}
    </InnerHeadingFrame>
  );
};

export default ShipmentRecordList;
