import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { Dashboard, Users, Signin, ProductView,AddProduct } from "./pages/index";
import { SideBar, Header } from "./components";

function App() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user && location.pathname === "/") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [user, location]);
  return (
    <div className="flex">
      {show && <SideBar />}
      <div className="w-[100%]">
        <div className="ml-[36px]">
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/ProductDetail" element={<ProductView />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="*" element={<Signin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
