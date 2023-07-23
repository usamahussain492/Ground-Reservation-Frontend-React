import AdminLeftBar from "../../../Components/Dashboard/AdminLeftBar";
import Admin_ManageGroundComponent from "../../../Components/Dashboard/MainContent/Admin/Admin_ManageGroundComponent";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";

function ManageGroundBooking() {
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

        <Admin_ManageGroundComponent />
      </div>
    </div>
  );
}

export default ManageGroundBooking;
