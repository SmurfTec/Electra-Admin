import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import {
  Dashboard,
  Users,
  Signin,
  ProductView,
  UserProfile,
  AddProduct,
  ProductRequests,
  Roles,
  Products,
  Wallet,
  Coupon,
  CreateCoupon,
  Category,
  CreateCategory,
  AddNewVariant,
  HelpCenter,
  HelpCenterDetail
} from "./pages/index";
import { SideBar } from "./components";

function App() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") as string);
  useEffect(() => {
    if (!user || location.pathname === "/") {
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
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/Productrequest" element={<ProductRequests />} />
            <Route path="/Roles" element={<Roles />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Wallet" element={<Wallet />} />
            <Route path="/Coupon" element={<Coupon />} />
            <Route path="/CreateCoupon" element={<CreateCoupon  />} />
            <Route path="/Category" element={<Category/>} />
            <Route path="/CreateCategory" element={<CreateCategory/>} />
            <Route path="/AddNewVariant" element={<AddNewVariant/>} />
            <Route path="/HelpCenter" element={<HelpCenter/>} />
            <Route path="/HelpCenterDetail" element={<HelpCenterDetail/>} />
            <Route path="*" element={<Signin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
