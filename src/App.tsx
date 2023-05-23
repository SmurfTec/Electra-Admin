import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./pages/index";
import { SideBar } from "./components/SideBar";

function App() {
  return (
    <div className="flex">
      <SideBar />
      <div>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
