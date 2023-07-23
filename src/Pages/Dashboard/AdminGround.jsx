import AdminLeftBar from "../../Components/Dashboard/AdminLeftBar";

import Admin_GroundContent from "../../Components/Dashboard/MainContent/Admin/Admin_GroundContent";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";

function AdminGround() {
  return (
    <div>
      <div className=" flex w-full">
        <div className=" hidden sm:block">
          <AdminLeftBar />
        </div>
        <TopNavigationBar />
        {/* *************************************** */}
        {/* CONTENT */}
        {/* *************************************** */}
        <Admin_GroundContent />
      </div>
    </div>
  );
}

export default AdminGround;
