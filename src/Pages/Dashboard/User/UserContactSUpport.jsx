import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import UserLeftMenuBar from "../../../Components/UserLeftMenuBar";
import Support from "../../../assets/support.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
function UserContactSUpport() {
  const [contactForm, setContactForm] = useState({
    email: "",
    name: "",
    description: "",
  });

  const Successnotify = () =>
    toast.sucess("Your complaint has been sent to the admin!");
  const handleSupport = async (e) => {
    e.preventDefault();

    const userData = {
      email: contactForm.email,
      name: contactForm.name,
      description: contactForm.description,
    };
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://ground-reservation-apis-production.up.railway.app/api/user/contact-us",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        Successnotify();
      }
      //   console.log("Response:", response);
      // Handle success or other actions
    } catch (error) {
      console.error("Error:", error);
      // Handle error or show error message
    }
  };

  return (
    <div>
      <div className=" flex w-full">
        <ToastContainer
          className="Z-10 absolute top-20"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className=" hidden sm:block">
          <UserLeftMenuBar />
        </div>
        <TopNavigationBar />
        {/* *************************************** */}
        {/* CONTENT */}
        {/* *************************************** */}
        <div className="w-full p-12 bg-gray-50 h-screen content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          <div className="block m-auto mt-12">
            <h2 className="text-center headingh4 text-3xl">
              Looking for support?
            </h2>
            <img
              src={Support}
              width={200}
              className="block m-auto mt-2"
              alt=""
            />
          </div>

          <div className="bg-white rounded-md shadow-md w-3/5 block m-auto p-6">
            <h2 className="headingh4 text-center mb-4">Fill form</h2>
            <div className="flex gap-10">
              <div>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Ali"
                  className="input input-bordered w-full max-w-xs"
                  value={contactForm.name}
                  onChange={(e) => {
                    setContactForm((oldValue) => ({
                      ...oldValue,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  placeholder="alex@ms.gov"
                  className="input input-bordered w-full max-w-xs"
                  value={contactForm.email}
                  onChange={(e) => {
                    setContactForm((oldValue) => ({
                      ...oldValue,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <textarea
              className="textarea textarea-bordered mt-4"
              placeholder="Enter your query in details"
              value={contactForm.description}
              onChange={(e) => {
                setContactForm((oldValue) => ({
                  ...oldValue,
                  description: e.target.value,
                }));
              }}
            ></textarea>
            <div>
              <button
                onClick={handleSupport}
                className="btn bg-gray-600 hover:bg-gray-700 mt-8 text-center block m-auto text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserContactSUpport;
