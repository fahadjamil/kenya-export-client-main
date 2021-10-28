import { createContext } from "react";

export const ProfileContext = createContext({
  profileInput: {},
  setProfileInput: () => {},
  getData: () => {},
});
