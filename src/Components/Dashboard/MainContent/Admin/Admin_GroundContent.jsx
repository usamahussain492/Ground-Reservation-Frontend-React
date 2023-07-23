import { Link } from "react-router-dom";

function Admin_GroundContent() {
  return (
    <div className="w-full p-12 bg-gray-50 h-screen content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
      <h2 className="headingh3 text-2xl mt-12 ml-12 text-gray-800  inline-block p-2 rounded-md">
        Manage Ground
      </h2>
      <div className="flex justify-center items-center p-8 flex-wrap gap-12">
        <Link to={"/groundRegistration"}>
          <div className="cursor-pointer  bg-gradient-to-r from-teal-900 to-lime-500 p-8 w-72 h-36 flex items-center justify-center rounded-lg shadow-md">
            <h2 className="headingh4  text-center text-gray-200">
              Ground Registration
            </h2>
          </div>
        </Link>

        <Link to={"/manageGround"}>
          <div className="cursor-pointer  bg-gradient-to-r from-teal-900 to-lime-500 p-8 w-72 h-36 flex items-center justify-center rounded-lg shadow-md">
            <h2 className="headingh4  text-center text-gray-200">
              Manage Ground Booking
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Admin_GroundContent;
