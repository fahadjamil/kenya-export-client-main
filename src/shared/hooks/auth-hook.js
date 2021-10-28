import { useState } from "react";

export const useAuth = () => {
  const stored_data = JSON.parse(localStorage.getItem("kenya-export-auth"));

  const [role, setRole] = useState(stored_data?.role);
  const [token, setToken] = useState(stored_data?.token);
  const [userId, setUserId] = useState(stored_data?.id);

  const login = (data) => {
    setRole(data?.role);
    setToken(data?.token);
    setUserId(data?.userId);
    localStorage.setItem(
      "kenya-export-auth",
      JSON.stringify({ role: data?.role, token: data?.token, id: data?.userId })
    );
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    setUserId(null);
    localStorage.removeItem("kenya-export-auth");
  };

  return { role, token, userId, login, logout };
};
