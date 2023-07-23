import AdminLeftBar from "../../../Components/Dashboard/AdminLeftBar";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import GroundRegistrationComponent from "../../../Components/Dashboard/MainContent/Admin/GroundRegistrationComponent";
function GroundRegistration() {
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

        <GroundRegistrationComponent />
      </div>
    </div>
  );
}

export default GroundRegistration;
