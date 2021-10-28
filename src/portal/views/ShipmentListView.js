import React, { useContext } from "react";

import ShipmentRecordList from "../components/customer/ShipmentRecordList";
import EmployeeShipmentRecordList from "../components/employee/ShipmentRecordList";
import { AuthContext } from "../../shared/context/auth-context";

const ShipmentList = () => {
  const auth = useContext(AuthContext);

  if (auth.role === "admin") return <EmployeeShipmentRecordList />;
  else if (auth.role === "employee") return <EmployeeShipmentRecordList />;
  else if (auth.role === "customer") return <ShipmentRecordList />;
  else return auth.logout();
};

export default ShipmentList;
