import AdminLeftBar from "../../Components/Dashboard/AdminLeftBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import Admin_HomeContent from "../../Components/Dashboard/MainContent/Admin/Admin-HomeContent";
function AdminHomePage() {
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
        <Admin_HomeContent />
      </div>
    </div>
  );
}

export default AdminHomePage;
