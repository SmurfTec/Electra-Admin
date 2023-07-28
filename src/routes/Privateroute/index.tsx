import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { token } from "../../store/Slices/AuthSlice";
function PrivateRoute({ children}:any) {
    const TOKEN = localStorage.getItem("user")
    return TOKEN !== "" && TOKEN !== null ? <>{children}</> : <Navigate to="/" />;
  }
export default PrivateRoute