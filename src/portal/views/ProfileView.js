import React, { useContext } from "react";

import Profile from "../components/customer/Profile";
import { AuthContext } from "../../shared/context/auth-context";

const ProfileView = () => {
  const auth = useContext(AuthContext);

  return <Profile />;
};

export default ProfileView;
