import { createContext } from "react";

export const AuthContext = createContext({
  role: null,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});
