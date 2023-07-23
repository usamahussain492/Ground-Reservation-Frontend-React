import { FaCampground } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { BiSupport, BiUser } from "react-icons/bi";
// bg-[#75f07a]
function MemberLeftMenuBar() {
  return (
    <aside className="w-52 bg-gradient-to-r from-green-500 to-green-700  mt-16 shadow-lg p-3   z-50 flex h-full bg-red-white ">
      {/* open sidebar button */}

      {/* MINI SIDEBAR*/}
      <div className="mini mt-8 flex flex-col space-y-5 w-full  h-[calc(100vh)]">
        <div className=" flex items-center justify-center  hover:ml-4   text-gray-800  dark:hover:text-white cursor-pointer w-full bg-white shadow-sm hover:bg-gray-200  hover:border hover:border-solid p-3 rounded-full ">
          <NavLink
            to={"/home/member"}
            className="text-gray-800 mr-2 buttonText font-medium"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "red" : "black",
              };
            }}
          >
            Home
          </NavLink>
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

        <Link to={"/member/ground"}>
          <div className=" flex items-center justify-center  hover:ml-4   text-gray-800  dark:hover:text-white cursor-pointer w-full bg-white shadow-sm hover:bg-gray-200  hover:border hover:border-solid p-3 rounded-full ">
            <h4 className="text-gray-800 mr-2 buttonText font-medium">
              Grounds
            </h4>

            <FaCampground />
          </div>
        </Link>

        <div className=" flex items-center justify-center  hover:ml-4   text-gray-800  dark:hover:text-white cursor-pointer w-full bg-white shadow-sm hover:bg-gray-200  hover:border hover:border-solid p-3 rounded-full ">
          <NavLink
            to={"/member/team"}
            className="text-gray-800 mr-2 buttonText font-medium"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "red" : "black",
              };
            }}
          >
            Team
          </NavLink>
          <PiUsersThreeBold />
        </div>

        <div className=" flex items-center justify-center  hover:ml-4   text-gray-800  dark:hover:text-white cursor-pointer w-full bg-white shadow-sm hover:bg-gray-200  hover:border hover:border-solid p-3 rounded-full ">
          <NavLink
            to={"/member/profile/setting"}
            className="text-gray-800 mr-2 buttonText font-medium"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "red" : "black",
              };
            }}
          >
            Profile
          </NavLink>

          <BiUser />
        </div>

        <div className=" flex items-center justify-center  hover:ml-4   text-gray-800  dark:hover:text-white cursor-pointer w-full bg-white shadow-sm hover:bg-gray-200  hover:border hover:border-solid p-3 rounded-full ">
          <NavLink
            to={"/member/contact"}
            className="text-gray-800 mr-2 buttonText font-medium"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isPending ? "red" : "black",
              };
            }}
          >
            Contact Support
          </NavLink>
          <BiSupport />
        </div>
      </div>
    </aside>
  );
}

export default MemberLeftMenuBar;
