import React, { useContext } from "react";

import AdminDashboard from "../components/admin/Dashboard";
import EmployeeDashboard from "../components/employee/Dashboard";
import CustomerDashboard from "../components/customer/Dashboard";
import { AuthContext } from "../../shared/context/auth-context";

const DashboardView = () => {
  const auth = useContext(AuthContext);

  if (auth.role === "admin") return <AdminDashboard />;
  else if (auth.role === "employee") return <AdminDashboard />;
  else if (auth.role === "customer") return <CustomerDashboard />;
  else return auth.logout();
};

export default DashboardView;
