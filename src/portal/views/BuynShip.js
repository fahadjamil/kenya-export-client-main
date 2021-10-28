import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import CustomerBuyNShipForm from "../components/customer/BuyNShipForm";
import EmployeeBuyNShipForm from "../components/employee/BuyNShipForm";

const BuynShip = () => {
  const auth = useContext(AuthContext);

  if (auth.role === "admin" || auth.role === "employee")
    return <EmployeeBuyNShipForm />;
  else if (auth.role === "customer") return <CustomerBuyNShipForm />;
  else auth.logout();
};

export default BuynShip;
