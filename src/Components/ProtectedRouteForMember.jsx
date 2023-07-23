import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteForMember() {
  const isLogin = localStorage.getItem("token");
  const isMember = localStorage.getItem("role");
  return isLogin && isMember == "member" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
}

export default ProtectedRouteForMember;
