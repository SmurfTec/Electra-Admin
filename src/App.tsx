import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { Dashboard,Users,Signin } from "./pages/index";
import { SideBar,Header } from "./components";

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  return (
    <div className="flex">
     {isLoggedIn && <SideBar />} 
      <div>
      {isLoggedIn && <Header />}  
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
