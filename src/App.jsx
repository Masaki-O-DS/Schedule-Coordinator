// src/App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopPage from "./Pages/TopPage";
import { EditSchedulePage } from "./Pages/EditSchedulePage";
import SelectDatePage from "./Pages/SelectDatePage";

function App() {
  return (
    <Router>
      <div className="white w-screen h-screen">
        <Routes>
          <Route path="/" element={<TopPage />}></Route>
          <Route
            path="/edit-schedule-page"
            element={<EditSchedulePage />}
          ></Route>
          <Route path="/select-date-page" element={<SelectDatePage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
