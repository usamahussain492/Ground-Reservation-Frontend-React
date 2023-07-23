import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
function TopNavigationBar() {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();
  return (
    <div className=" fixed w-full z-30 flex bg-white shadow-md dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
      {/* SPACER */}

      <img className="w-14 relative left-10" src={Logo} alt="" />
      <h2 className="ml-12 headingh3 ">E-Ground</h2>
      <div className="grow h-full flex items-center justify-center  " />
      <div className="flex-none h-full text-center flex items-center justify-center">
        <div className="flex space-x-3 items-center px-3">
          <div className="flex-none flex justify-center">
            <div className="w-8 h-8 flex ">
              <img
                onClick={() => setModal(!modal)}
                src={localStorage.getItem("profileURL")}
                alt="profile"
                className="cursor-pointer shadow rounded-full object-cover"
              />
            </div>
          </div>
          {modal == true ? (
            <div className="bg-white rounded-lg w-32 h-20 relative top-14 left-16 flex items-center justify-center ">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="btn bg-gray-500 hover:bg-gray-600 text-white "
              >
                Logout
              </button>
            </div>
          ) : undefined}

          <div className="cursor-pointer hidden md:block text-sm md:text-md text-black dark:text-white">
            {localStorage.getItem("userName")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNavigationBar;
