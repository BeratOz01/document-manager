import React from "react";

const AuthContext = React.createContext({
  token: "",
  isAuthenticated: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expiresAt) => {
  const now = new Date().getTime();
  const adjExpirationTime = new Date(expiresAt).getTime();

  const remainingTime = adjExpirationTime - now;
  return remainingTime;
};

export const AuthContextProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = React.useState(initialToken);

  const userIsAuthenticated = !!token;

  const onLogin = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const onLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
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
