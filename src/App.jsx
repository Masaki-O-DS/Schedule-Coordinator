// src/App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopPage from "./Pages/TopPage";

function App() {
  return (
    <Router>
      <div
        className="bg-indigo-950
      "
      >
        <Routes>
          <Route path="/" element={<TopPage />}></Route>
          <Route path="/"></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
