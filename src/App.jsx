// src/App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopPage from "./Pages/TopPage";
import { EditSchedulePage } from "./Pages/EditSchedulePage";
import SelectDatePage from "./Pages/SelectDatePage";
import ShareLinkPage from "./Pages/ShareLinkPage";
import VisitorEditSchedulePage from "./Pages/VisitorEditSchedulePage";
import ThankyouPage from "./Pages/ThankyouPage";
import VisitorTopPage from "./Pages/VisitorTopPage";
import AdminTimeManagementPage from "./Pages/AdminTimeManagementPage";
import ConfirmPage from "./Pages/ConfirmPage";

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
          <Route path="/share-link-page" element={<ShareLinkPage />}></Route>
          <Route
            path="/shared/:adminId/:eventId"
            element={<VisitorTopPage />}
          ></Route>
          <Route
            path="/visitor-edit-schedule-page"
            element={<VisitorEditSchedulePage />}
          ></Route>
          <Route path="/thankyou-page" element={<ThankyouPage />}></Route>
          <Route
            path="/time-management-page"
            element={<AdminTimeManagementPage />}
          ></Route>
          <Route path="/confirm-page" element={<ConfirmPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
