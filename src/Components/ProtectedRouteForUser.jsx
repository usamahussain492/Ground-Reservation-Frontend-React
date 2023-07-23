import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteForMember() {
  const isLogin = localStorage.getItem("token");
  const isUser = localStorage.getItem("role");
  return isLogin && isUser == "user" ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRouteForMember;
