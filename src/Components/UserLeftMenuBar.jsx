import { FaCampground } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BiSupport, BiUser } from "react-icons/bi";

function UserLeftMenuBar() {
  return (
    <aside className="w-52 bg-gradient-to-r from-green-500 to-green-700  mt-16 shadow-md p-3   z-50 flex h-full bg-red-white ">
      {/* open sidebar button */}

      {/* MINI SIDEBAR*/}
      <div className="mini mt-8 flex flex-col space-y-5 w-full  h-[calc(100vh)]">
        <div className=" flex items-center justify-center  hover:ml-4   text-gray-800  dark:hover:text-white cursor-pointer w-full bg-white shadow-sm hover:bg-gray-200  hover:border hover:border-solid p-3 rounded-full ">
          <Link to={"/"} className="text-gray-800 mr-2 buttonText font-medium">
            Home
          </Link>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="{1.5}"
            stroke="currentColor"
            className="w-4 h-4 text-gray-800 font-bold "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>
        <div className=" flex items-center justify-center  hover:ml-4   text-gray-800  dark:hover:text-white cursor-pointer w-full bg-white shadow-sm hover:bg-gray-200  hover:border hover:border-solid p-3 rounded-full ">
          <Link
            to={"/user/ground"}
            className="text-gray-800 mr-2 buttonText font-medium"
          >
            Grounds
          </Link>

          <FaCampground />
        </div>
        <div className=" flex items-center justify-center  hover:ml-4   text-gray-800  dark:hover:text-white cursor-pointer w-full bg-white shadow-sm hover:bg-gray-200  hover:border hover:border-solid p-3 rounded-full ">
          <Link
            to={"/user/ground"}
            className="text-gray-800 mr-2 buttonText font-medium"
          >
            Reservations
          </Link>

          <PiUsersThreeBold />
        </div>

        <div className=" flex items-center justify-center  hover:ml-4   text-gray-800  dark:hover:text-white cursor-pointer w-full bg-white shadow-sm hover:bg-gray-200  hover:border hover:border-solid p-3 rounded-full ">
          <Link
            to={"/user/profile/settings"}
            className="text-gray-800 mr-2 buttonText font-medium"
          >
            Profile
          </Link>
          <BiUser />
        </div>

        <div className=" relative top-1/3 flex items-center justify-center  hover:ml-4   text-white  dark:hover:text-white cursor-pointer w-full bg-gray-600 shadow-sm hover:bg-gray-700  hover:border hover:border-solid p-3 rounded-full ">
          <Link
            to={"/user/contact"}
            className="text-white mr-2 buttonText font-medium"
          >
            Contact Support
          </Link>
          <BiSupport />
        </div>
      </div>
    </aside>
  );
}

export default UserLeftMenuBar;
