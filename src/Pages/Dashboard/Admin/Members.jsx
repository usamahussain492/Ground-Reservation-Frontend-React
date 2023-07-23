import { Link } from "react-router-dom";
import AdminLeftBar from "../../../Components/Dashboard/AdminLeftBar";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";

function Members() {
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
        <div className="w-full p-12 bg-gray-50 h-screen content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          <div className="flex flex-wrap gap-12 justify-center items-center m-auto mt-12 p-12">
            <Link to={"/admin/members/users"}>
              <div className="cursor-pointer  bg-gradient-to-r from-teal-900 to-lime-500 p-8 w-72 h-36 flex items-center justify-center rounded-lg shadow-md">
                <h2 className="headingh4  text-center text-gray-200">
                  View Users
                </h2>
              </div>
            </Link>

            <Link to={"/admin/members/members"}>
              <div className="cursor-pointer  bg-gradient-to-r from-teal-900 to-lime-500 p-8 w-72 h-36 flex items-center justify-center rounded-lg shadow-md">
                <h2 className="headingh4  text-center text-gray-200">
                  View Members
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Members;
