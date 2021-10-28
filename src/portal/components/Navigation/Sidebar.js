import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiShipFill } from "react-icons/ri";
import { FaPlaneDeparture, FaBoxes, FaTruckLoading } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { BiStats } from "react-icons/bi";

import { AuthContext } from "../../../shared/context/auth-context";
import "./Sidebar.css";

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const LogoutHandler = () => {
    auth.logout();
    history.push("/");
  };

  return (
    <ul className="sidebar-section">
      <li>
        <NavLink to="/dashboard">
          <MdDashboard size={25} />
          <p>Dashboard</p>
        </NavLink>
      </li>
      {auth.role === "customer" && (
        <li>
          <NavLink to="/shipment-form">
            <FaBoxes size={25} />
            <p>Shipment Form</p>
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/buynship-form">
          <IoMdCart size={25} />
          <p>Buy N Ship Form</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/shipment-list/ship">
          <RiShipFill size={25} />
          <p>Shipments by Sea</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/shipment-list/plane">
          <FaPlaneDeparture size={25} />
          <p>Shipments by Air</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/shipment-list/buynship">
          <IoMdCart size={25} />
          <p>Buy n Ship Shipments</p>
        </NavLink>
      </li>
      {auth.role === "admin" && (
        <li>
          <NavLink to="/users-list/customer">
            <BsPeopleFill size={25} />
            <p>Admins</p>
          </NavLink>
        </li>
      )}
      {(auth.role === "admin" || auth.role === "employee") && (
        <li>
          <NavLink to="/collection-update">
            <FaTruckLoading size={25} />
            <p>Collection Update</p>
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/shipment-tracking">
          <BiStats size={32} />
          <p>Shipment Tracking</p>
        </NavLink>
      </li>
      {(auth.role === "admin" || auth.role === "employee") && (
        <li>
          <NavLink to="/subscribers">
            <IoNewspaper size={25} />
            <p>Newsletter Subscribers</p>
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default Sidebar;
