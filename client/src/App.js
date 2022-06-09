import Web3 from "web3";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
