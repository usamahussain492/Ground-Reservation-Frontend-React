import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EnterNewPwd() {
  const [pwd, setPwd] = useState();
  const navigate = useNavigate();

  const Successnotify = () => toast.sucess("Password updated");

  const Errornotify = () => toast.error("Invalid data");

  const location = useLocation();
  const id = location.state?.id;
  // console.log(id);

  const updatePwd = () => {
    const options = {
      url: "https://ground-reservation-apis-production.up.railway.app/api/auth/reset-password",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        userId: id,
        password: pwd,
      },
    };

    axios(options)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // Successnotify();
          alert("Done");
          navigate("/login");
        } else {
          Errornotify();
        }
      })
      .catch((e) => {
        Errornotify();
      });
  };

  return (
    <div className=" flex h-screen items-center justify-center">
      <div className="w-1/2 h-1/2 p-8 bg-gray-50 rounded-md shadow-md">
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
        <h2 className="para font-semibold text-2xl text-center">
          Forget Password
        </h2>

        <div className="flex mt-8 flex-col justify-center m-auto items-center">
          <h4 className="para mt-4">Enter new password</h4>
          <input
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            type="password"
            placeholder="lu#cky**can()da"
            className="input input-bordered w-full max-w-xs mt-1"
          />
        </div>
        <button
          onClick={updatePwd}
          className="btn text-center m-auto block mt-6 bg-green-500 text-white
    hover:bg-green-600
    "
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EnterNewPwd;
