import { GoVerified, GoAlert } from "react-icons/go";
import { GoPlus, GoCheck } from "react-icons/go";

import requested from "../assets/status_icons/requested_info.png";
import picked from "../assets/status_icons/picked_info.png";
import warehouse from "../assets/status_icons/warehouse_info.png";
import transit from "../assets/status_icons/transit_info.png";
import nairobi from "../assets/status_icons/nairobi_info.png";
import invoiced from "../assets/status_icons/invoiced_info.png";
import delivered from "../assets/status_icons/delivered_info.png";
import paid from "../assets/status_icons/paid_info.png";

import requested_red from "../assets/status_icons/requested_red.png";
import picked_red from "../assets/status_icons/picked_red.png";
import warehouse_red from "../assets/status_icons/warehouse_red.png";
import transit_red from "../assets/status_icons/transit_red.png";
import nairobi_red from "../assets/status_icons/nairobi_red.png";
import invoiced_red from "../assets/status_icons/invoiced_red.png";
import delivered_red from "../assets/status_icons/delivered_red.png";
import paid_red from "../assets/status_icons/paid_red.png";

import requested_green from "../assets/status_icons/requested_green.png";
import picked_green from "../assets/status_icons/picked_green.png";
import warehouse_green from "../assets/status_icons/warehouse_green.png";
import transit_green from "../assets/status_icons/transit_green.png";
import nairobi_green from "../assets/status_icons/nairobi_green.png";
import invoiced_green from "../assets/status_icons/invoiced_green.png";
import delivered_green from "../assets/status_icons/delivered_green.png";
import paid_green from "../assets/status_icons/paid_green.png";

import requested_black from "../assets/status_icons/requested_black.png";
import picked_black from "../assets/status_icons/picked_black.png";
import warehouse_black from "../assets/status_icons/warehouse_black.png";
import transit_black from "../assets/status_icons/transit_black.png";
import nairobi_black from "../assets/status_icons/nairobi_black.png";
import invoiced_black from "../assets/status_icons/invoiced_black.png";
import delivered_black from "../assets/status_icons/delivered_black.png";
import paid_black from "../assets/status_icons/paid_black.png";

import requested_white from "../assets/status_icons/requested_white.png";
import picked_white from "../assets/status_icons/picked_white.png";
import warehouse_white from "../assets/status_icons/warehouse_white.png";
import transit_white from "../assets/status_icons/transit_white.png";
import nairobi_white from "../assets/status_icons/nairobi_white.png";
import invoiced_white from "../assets/status_icons/invoiced_white.png";
import delivered_white from "../assets/status_icons/delivered_white.png";
import paid_white from "../assets/status_icons/paid_white.png";

export const shipmentStatus = [
  { value: "requested", src: requested, name: "Requested" },
  { value: "picked_up", src: picked, name: "Picked Up" },
  { value: "at_warehouse", src: warehouse, name: "At Warehouse" },
  { value: "in_transit", src: transit, name: "In Transit" },
  { value: "in_nairobi", src: nairobi, name: "In Nairobi" },
  { value: "invoiced", src: invoiced, name: "Invoiced" },
  { value: "delivered", src: delivered, name: "Delivered" },
  { value: "paid", src: paid, name: "Paid" },
];

export const shipmentStatusRed = [
  { value: "requested", src: requested_red, name: "Requested" },
  { value: "picked_up", src: picked_red, name: "Picked Up" },
  { value: "at_warehouse", src: warehouse_red, name: "At Warehouse" },
  { value: "in_transit", src: transit_red, name: "In Transit" },
  { value: "in_nairobi", src: nairobi_red, name: "In Nairobi" },
  { value: "invoiced", src: invoiced_red, name: "Invoiced" },
  { value: "delivered", src: delivered_red, name: "Delivered" },
  { value: "paid", src: paid_red, name: "Paid" },
];

export const shipmentStatusGreen = [
  { value: "requested", src: requested_green, name: "Requested" },
  { value: "picked_up", src: picked_green, name: "Picked Up" },
  { value: "at_warehouse", src: warehouse_green, name: "At Warehouse" },
  { value: "in_transit", src: transit_green, name: "In Transit" },
  { value: "in_nairobi", src: nairobi_green, name: "In Nairobi" },
  { value: "invoiced", src: invoiced_green, name: "Invoiced" },
  { value: "delivered", src: delivered_green, name: "Delivered" },
  { value: "paid", src: paid_green, name: "Paid" },
];

export const shipmentStatusBlack = [
  { value: "requested", src: requested_black, name: "Requested" },
  { value: "picked_up", src: picked_black, name: "Picked Up" },
  { value: "at_warehouse", src: warehouse_black, name: "At Warehouse" },
  { value: "in_transit", src: transit_black, name: "In Transit" },
  { value: "in_nairobi", src: nairobi_black, name: "In Nairobi" },
  { value: "invoiced", src: invoiced_black, name: "Invoiced" },
  { value: "delivered", src: delivered_black, name: "Delivered" },
  { value: "paid", src: paid_black, name: "Paid" },
];

export const shipmentStatusWhite = [
  { value: "requested", src: requested_white, name: "Requested" },
  { value: "picked_up", src: picked_white, name: "Picked Up" },
  { value: "at_warehouse", src: warehouse_white, name: "At Warehouse" },
  { value: "in_transit", src: transit_white, name: "In Transit" },
  { value: "in_nairobi", src: nairobi_white, name: "In Nairobi" },
  { value: "invoiced", src: invoiced_white, name: "Invoiced" },
  { value: "delivered", src: delivered_white, name: "Delivered" },
  { value: "paid", src: paid_white, name: "Paid" },
];

export const shipmentStatusColor = [
  { value: "requested", src: requested_red, name: "Requested" },
  { value: "picked_up", src: picked_green, name: "Picked Up" },
  { value: "at_warehouse", src: warehouse, name: "At Warehouse" },
  { value: "in_transit", src: transit_red, name: "In Transit" },
  { value: "in_nairobi", src: nairobi_green, name: "In Nairobi" },
  { value: "invoiced", src: invoiced, name: "Invoiced" },
  { value: "delivered", src: delivered_red, name: "Delivered" },
  { value: "paid", src: paid_green, name: "Paid" },
];

export const activeStatus = [
  {
    value: true,
    icon: <span className="badge badge-success">Active</span>,
    name: "Active",
  },
  {
    value: false,
    icon: <span className="badge badge-danger">Inactive</span>,
    name: "Inactive",
  },
];

export const paidStatus = [
  {
    value: true,
    icon: <span className="badge badge-success">Paid</span>,
    name: "Paid",
  },
  {
    value: false,
    icon: <span className="badge badge-danger">Unpaid</span>,
    name: "Unpaid",
  },
];

export const roleStatus = [
  {
    value: "admin",
    icon: <span className="badge badge-success">Admin</span>,
    name: "Admin",
  },
  {
    value: "employee",
    icon: <span className="badge badge-success">Employee</span>,
    name: "Employee",
  }
];
