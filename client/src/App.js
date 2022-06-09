import React from "react";

// react-router-dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "pages/Home";
import Login from "pages/Login";

// Context API
import { AuthContext } from "store/auth-context";
import Dashboard from "pages/Dashboard";

function App() {
  const authCtx = React.useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            authCtx.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
