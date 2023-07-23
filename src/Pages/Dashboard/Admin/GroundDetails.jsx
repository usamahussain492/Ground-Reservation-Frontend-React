import AdminLeftBar from "../../../Components/Dashboard/AdminLeftBar";
import AdminDetails from "../../../Components/Dashboard/MainContent/Admin/Admin_GetDetailsComponent";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";

function GroundDetails() {
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
        <AdminDetails />
      </div>
    </div>
  );
}

export default GroundDetails;
