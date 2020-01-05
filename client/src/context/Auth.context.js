import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false
});
