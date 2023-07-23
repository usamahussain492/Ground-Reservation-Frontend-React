import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPwd() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const Errornotify = () =>
    toast.error("Invalid email address OR Email isn't registerd");

  const MessageNotify = () => toast.msg("User not found");

  const handleForgetPwd = () => {
    const options = {
      url: "https://ground-reservation-apis-production.up.railway.app/api/auth/get-otp",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        email: email,
      },
    };

    axios(options)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/verifyotp");
        } else {
          MessageNotify();
        }
      })
      .catch((e) => {
        Errornotify();
      });
  };
  return (
    <div className=" flex h-screen items-center justify-center">
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
      <div className="w-1/2 h-1/2 p-8 bg-gray-50 rounded-md shadow-md">
        <h2 className="para font-semibold text-2xl text-center">
          Forget Password
        </h2>

        <div className="flex mt-8 flex-col justify-center m-auto items-center">
          <h4 className="para mt-4">Enter your email</h4>
          <input
            type="email"
            placeholder="dev@humza.pk"
            className="input input-bordered w-full max-w-xs mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleForgetPwd}
          className="btn text-center m-auto block mt-6 bg-green-500 text-white
        hover:bg-green-600
        "
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ForgetPwd;
