import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Web3Provider } from "components/providers";
import Layout from "components/ui/Layout";

import { AuthContextProvider } from "store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Web3Provider>
      <Layout>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Layout>
    </Web3Provider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
