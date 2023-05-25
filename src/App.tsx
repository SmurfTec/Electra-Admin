import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Dashboard,Users } from "./pages/index";
import { SideBar,Header } from "./components";

function App() {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-[90%]">
        <Header />
        <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" replace />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
