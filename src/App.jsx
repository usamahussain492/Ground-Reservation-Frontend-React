import { Routes, Route } from "react-router-dom";
import "./App.css";
import EnterNewPwd from "./Pages/Authentication/EnterNewPwd";
import ForgetPwd from "./Pages/Authentication/ForgetPwd";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import VerifyOTP from "./Pages/Authentication/VerifyOTP";
import GroundDetails from "./Pages/Dashboard/Admin/GroundDetails";
import GroundRegistration from "./Pages/Dashboard/Admin/GroundRegistration";
import ManageGroundBooking from "./Pages/Dashboard/Admin/ManageGroundBooking";
import AdminGround from "./Pages/Dashboard/AdminGround";
import AdminHomePage from "./Pages/Dashboard/AdminHomePage";
import UserGround from "./Pages/Dashboard/User/UserGround";
import UserHomePage from "./Pages/Dashboard/User/UserHomePage";
import UserGroundDetails from "./Pages/Dashboard/User/UserGroundDetails";
import UserEditProfile from "./Pages/Dashboard/User/UserEditProfile";
import UserContactSUpport from "./Pages/Dashboard/User/UserContactSUpport";
import Team from "./Pages/Dashboard/Admin/Team";
import Tournment from "./Pages/Dashboard/Admin/Tournment";
import MemberHomePage from "./Pages/Dashboard/Member/MemberHomePage";
import VerifyPaymentOTP from "./Pages/Authentication/VerifyPaymentOTP";
import MemberGround from "./Pages/Dashboard/Member/MemberGround";
import MemberGroundDetails from "./Pages/Dashboard/Member/MemberGroundDetails";
import MemberEditProfile from "./Pages/Dashboard/Member/MemberEditProfile";
import MemberContactSupport from "./Pages/Dashboard/Member/MemberContactSupport";
import MemberTeam from "./Pages/Dashboard/Member/MemberTeam";
import Support from "./Pages/Dashboard/Admin/Support";
import Members from "./Pages/Dashboard/Admin/Members";
import AdminViewUser from "./Pages/Dashboard/Admin/AdminViewUser";
import AdminViewMembers from "./Pages/Dashboard/Admin/AdminViewMembers";
import AdminActiveMembersMenu from "./Pages/Dashboard/Admin/AdminActiveMembersMenu";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedRouteForMember from "./Components/ProtectedRouteForMember";
import ProtectedRouteForUser from "./Components/ProtectedRouteForUser";
import PageNotFound404 from "./Pages/PageNotFound404";
function App() {
  // const isAdmin = localStorage.getItem("role"); // Retrieve user role from the state or context
  // const role = localStorage.getItem("role");
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/home" element={<AdminHomePage />} />

        <Route path="/grounds" element={<AdminGround />}></Route>
        <Route
          path="/groundRegistration"
          element={<GroundRegistration />}
        ></Route>
        <Route path="/manageGround" element={<ManageGroundBooking />}></Route>
        <Route
          path="/manageGround/details/:id"
          element={<GroundDetails />}
        ></Route>
        <Route path="/team" element={<Team />}></Route>
        <Route path="/admin/tournment" element={<Tournment />}></Route>

        <Route path="/admin/support" element={<Support />}></Route>

        <Route path="/admin/members" element={<Members />}></Route>
        <Route path="/admin/members/users" element={<AdminViewUser />}></Route>
        <Route
          path="/admin/members/members"
          element={<AdminViewMembers />}
        ></Route>
        <Route
          path="/admin/activemembers"
          element={<AdminActiveMembersMenu />}
        ></Route>
      </Route>

      {/* ******************
            USER ROUTES
      ****************** */}

      <Route element={<ProtectedRouteForUser />}>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/user/ground" element={<UserGround />}></Route>
        <Route
          path="/user/ground/details/:id"
          element={<UserGroundDetails />}
        ></Route>
        <Route
          path="/user/profile/settings"
          element={<UserEditProfile />}
        ></Route>
        <Route path="/user/contact" element={<UserContactSUpport />}></Route>
      </Route>
      {/* ******************
            MEMBER ROUTES
      ****************** */}
      <Route element={<ProtectedRouteForMember />}>
        <Route path="/home/member" element={<MemberHomePage />} />
        <Route path="/member/ground" element={<MemberGround />} />
        <Route
          path="/member/ground/details/:id"
          element={<MemberGroundDetails />}
        />
        <Route path="/member/profile/setting" element={<MemberEditProfile />} />
        <Route
          path="/member/contact"
          element={<MemberContactSupport />}
        ></Route>
        <Route path="/member/team" element={<MemberTeam />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgetpwd" element={<ForgetPwd />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/verifyotp" element={<VerifyOTP />}></Route>
      <Route path="/paymentotp" element={<VerifyPaymentOTP />}></Route>

      <Route path="/newpwd" element={<EnterNewPwd />}></Route>
      <Route path="/*" element={<PageNotFound404 />}></Route>
    </Routes>
  );
}

export default App;
