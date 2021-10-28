import React, { useContext } from "react";

import UsersList from "../components/admin/UsersList";
import { AuthContext } from "../../shared/context/auth-context";

const UsersListView = () => {
  const auth = useContext(AuthContext);

  if (auth.role === "admin") return <UsersList />;
  else return auth.logout();
};

export default UsersListView;
