import React from "react";

export const AuthContext = React.createContext({
  token: "",
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const initialExpireAt = localStorage.getItem("expiresAt");

  const [token, setToken] = React.useState(initialToken);
  const [expiresAt, setExpiresAt] = React.useState(initialExpireAt);

  const nowInUnix = Math.round(Date.now() / 1000);
  const userIsAuthenticated = !!token && nowInUnix < expiresAt;

  const onLogin = (token, expiresAt_) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", expiresAt_);
  };

  const onLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    console.log("Logged out");
  };

  const contextValue = {
    token,
    isAuthenticated: userIsAuthenticated,
    login: onLogin,
    logout: onLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
