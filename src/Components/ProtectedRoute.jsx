import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLogin = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role");
  return isLogin && isAdmin == "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
  // if ((isLogin, isAdmin == "admin")) {
  //   return <Outlet />;
  // } else {
  //   <Navigate to={"/login"}></Navigate>;
  // }
  //   return isLogin ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
