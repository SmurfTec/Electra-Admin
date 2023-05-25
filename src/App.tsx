import React, { useState,useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { Dashboard,Users,Signin } from "./pages/index";
import { SideBar,Header } from "./components";

function App() {


  return (
    <div className="flex">
      <SideBar />
      <div>
       <Header />
        <Routes>
        <Route path="/" element={<Signin  />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
