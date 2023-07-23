import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [userName, setUserName] = useState();
  const [pwd, setPwd] = useState();
  const navigate = useNavigate();

  const Successnotify = () => toast.sucess("");
  const Errornotify = () => toast.error("Invalid Data");
  const handleLogin = () => {
    // axios POST request

    const data = {
      username: userName,
      password: pwd,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        "https://ground-reservation-apis-production.up.railway.app/api/auth/login",
        JSON.stringify(data),
        { headers }
      )
      .then((response) => {
        // Handle the response here
        if (response.status == 200) {
          localStorage.setItem("token", response.data.result.token);
          localStorage.setItem("role", response.data.result.isMember);

          localStorage.setItem("profileURL", response.data.result.image);
          localStorage.setItem("userName", response.data.result.username);

          // console.log(response.data.result.user.role);
          if (response.data.result.isMember == "admin") {
            navigate("/admin/home");
          } else if (response.data.result.isMember == "member") {
            navigate("/home/member");
          } else {
            navigate("/");
          }
        }
        if (response.status == 400) {
          Successnotify;
        }
        // console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        Errornotify();
        console.error(error);
      });
  };

  return (
    <div className="  flex items-center justify-center w-4/5 h-screen m-auto -mt-12 sm:-mt-0 rounded-lg">
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
      <div
        className="bg-no-repeat bg-cover bg-center relative h-4/5 rounded-lg shadow-md "
        style={{
          backgroundImage:
            "url(https://w0.peakpx.com/wallpaper/434/54/HD-wallpaper-yellow-green-basic-cool-design-druffix-happy-birtay-home-home-screen-htc-iphone-locked-love-samsung-style.jpg)",
        }}
      >
        <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-5 " />
        <div className="min-h-full sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start  lg:flex flex-col  text-white">
              <h1 className="mb-3 font-bold hidden sm:block text-5xl">
                Welcome to E-Ground System
              </h1>

              <img
                className="w-1/2 m-auto hidden sm:block"
                src="https://cdni.iconscout.com/illustration/premium/thumb/sports-player-playing-american-football-6200684-5090555.png"
                alt=""
              />
              <p className="pr-3 font-medium hidden sm:block">
                Revolutionizing Sports Accessibility: The E-Ground Sport
                Provision System - Fueling Active Lifestyles for All
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-100 sm:mr-12  ">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    User Name
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="username"
                    placeholder="ImranKhan12"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to={"/forgetpwd"}
                      className="text-green-600 hover:text-green-700"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleLogin}
                    type="submit"
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                  <Link to={"/register"}>
                    <h2 className="para font-medium cursor-pointer text-center mt-4 text-gray-600">
                      If new?{" "}
                      <span className="font-semibold p-1 rounded-lg text-gray-500 underline">
                        {" "}
                        Signup{" "}
                      </span>{" "}
                      now
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
