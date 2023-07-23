import axios from "axios";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const [email, setEmail] = useState();
  const [membership, setMembership] = useState();
  const [formValue, setFromValue] = useState({
    username: "",
    email: "",
    pwd: "",
    phone: "",
  });
  const [modal, setModal] = useState(false);

  const notify = () => toast.info(`Membership is selected`);
  const Successnotify = () => toast.success("Registration succeded");
  const MessageNotify = () => toast.msg("User alrady exists");
  const Errornotify = () =>
    toast.error("Error valid data to continue OR email alredy exists");

  const navigate = useNavigate();
  const handleRegister = () => {
    // axios POST request

    const data = {
      username: formValue.username,
      email: formValue.email,
      password: formValue.pwd,
      membership: membership,
      phoneNo: formValue.phone,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        "https://ground-reservation-apis-production.up.railway.app/api/auth/register",
        JSON.stringify(data),
        { headers }
      )
      .then((response) => {
        // Handle the response here
        if (response.status == 201) {
          Successnotify();
          setModal(true);

          // navigate("/login");
        }
        if (response.status == 400) {
          MessageNotify();
        }
        // console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        Errornotify();
        console.error(error);
      });
  };

  const handleOTP = () => {
    const token = localStorage.getItem("token");

    // Assuming the API endpoint you want to make a request to is 'https://api.example.com/post'
    const apiUrl =
      "https://ground-reservation-apis-production.up.railway.app/api/auth/get-otp";

    // Assuming you have some data to send in the request body
    const requestData = {
      email: email,
    };

    // Set the headers with the JWT token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Make the POST request using Axios
    axios
      .post(apiUrl, requestData, { headers })
      .then((response) => {
        // Handle the response from the API
        console.log(response.status);
        if (response.data.code == 200) {
          navigate("/paymentotp");
        } else {
          alert("Email isn't registred with out system");
        }

        // console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        alert("Email isn't registred with our system");
      });
  };
  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col ">
        <div className="container w-1/2 mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-gray-50 px-6 py-8 rounded shadow-md text-black w-full">
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <h1 className="mb-8 headingh4 text-center">Sign up</h1>
            {/* << MODEL CODE FOR PAYMENT VERIFICATION >> */}
            {modal == true ? (
              <div className="absolute bg-white rounded-lg shadow-2xl w-1/2 h-auto pb-12  ">
                <MdClose
                  onClick={() => {
                    setModal(false);
                  }}
                  className="float-right relative top-6 right-7 cursor-pointer text-xl"
                />
                <h2 className="headingh4 relative top-12 left-12 text-2xl">
                  {" "}
                  Payment Verification
                </h2>

                <div className="flex justify-center relative mt-20  items-center gap-12">
                  <div
                    onClick={() => {
                      alert("Easypaisa selected");
                    }}
                    className="shadow-md p-2 rounded-lg hover:border-2 border-solid border-green-500 hover:rounded-2xl cursor-pointer hover:shadow-xl"
                  >
                    <img
                      className="w-28 h-28"
                      src="https://apkresult.com/Logos/easypaisa-apkresult.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    onClick={() => {
                      alert("Jaazcash selected");
                    }}
                    className="shadow-md p-2 rounded-lg hover:border-2 border-solid border-green-500 hover:rounded-2xl cursor-pointer hover:shadow-xl"
                  >
                    <img
                      className="w-28 h-28"
                      src="https://www.nadeem-computers.com/wp-content/uploads/2020/08/jazzcashlogo.jpg"
                      alt=""
                    />
                  </div>
                </div>

                <div className="w-1/2 mt-12 block m-auto">
                  <label htmlFor="">Enter your email</label>
                  <input
                    type="text"
                    placeholder="payment@verfication.pk"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </div>
                <button
                  onClick={handleOTP}
                  className="btn text-center block m-auto relative mt-12 bg-green-500 text-white hover:bg-green-600"
                >
                  Continue
                </button>
              </div>
            ) : undefined}

            <div className="flex gap-6 ">
              <div>
                <label htmlFor="UserName">Username</label>
                <input
                  type="text"
                  className="border border-grey-light w-full p-3 rounded mb-4"
                  name="fullname"
                  placeholder="Username"
                  value={formValue.username}
                  onChange={(e) => {
                    setFromValue((old) => ({
                      ...old,
                      username: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className=" border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="Email"
                  value={formValue.email}
                  onChange={(e) => {
                    setFromValue((old) => ({
                      ...old,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-14 ">
              <div>
                <label htmlFor="Pass">Password</label>
                <input
                  type="password"
                  className="block border border-grey-light  p-3 rounded mb-4 "
                  name="password"
                  placeholder="Password"
                  value={formValue.pwd}
                  onChange={(e) => {
                    setFromValue((old) => ({
                      ...old,
                      pwd: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label htmlFor="Pass">Phone No</label>
                <input
                  type="tel"
                  className="block border border-grey-light  p-3 rounded mb-4 "
                  name="phone"
                  placeholder=""
                  value={formValue.phone}
                  onChange={(e) => {
                    setFromValue((old) => ({
                      ...old,
                      phone: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <label htmlFor="role">Select a package</label>

            <div className=" overflow-y-scroll h-64 flex flex-wrap gap-4 overflow-hidden over">
              <div className="bg-white w-3/4 m-auto  p-6 scroll-auto shadow-sm rounded-md">
                <h3 className="headingh4 text-center">Package: None</h3>
                <span className="para">
                  <p>You will be treated as a normall user</p>
                </span>
                <div className="flex justify-around mt-2">
                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg shadow-md ">
                    <h5 className="text-white para text-center font-bold">
                      Discount
                    </h5>
                    <h4 className="text-white para  text-center">0%</h4>
                  </div>

                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg shadow-md ">
                    <h5 className="text-white para text-center font-bold ">
                      Duration
                    </h5>
                    <h4 className="text-white para text-center">nill</h4>
                  </div>

                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg shadow-md ">
                    <h5 className="text-white para text-center font-bold">
                      Price
                    </h5>
                    <h4 className="text-white para  text-center">0</h4>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMembership("none");
                    notify();
                  }}
                  className="btn mt-6 block m-auto bg-gray-500 text-white hover:bg-slate-800"
                >
                  SELECT
                </button>
              </div>

              {/* 2nd DIV */}

              <div className="bg-white w-3/4 m-auto  p-6 scroll-auto shadow-sm rounded-md">
                <h3 className="headingh4 text-center">Package: Bronze</h3>
                {/* <span className="para">
                  <p>You will be treated as a normall user</p>
                </span> */}
                <div className="flex justify-around mt-2">
                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg shadow-md ">
                    <h5 className="text-white para text-center font-bold">
                      Discount
                    </h5>
                    <h4 className="text-white para  text-center">10%</h4>
                  </div>

                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg  shadow-md">
                    <h5 className="text-white para text-center font-bold ">
                      Duration
                    </h5>
                    <h4 className="text-white para text-center">1/Month</h4>
                  </div>

                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg  shadow-md">
                    <h5 className="text-white para text-center font-bold">
                      Price
                    </h5>
                    <h4 className="text-white para  text-center">1000 Pk.r</h4>
                  </div>
                </div>

                <button
                  onClick={() => {
                    notify();
                    setMembership("bronze");
                  }}
                  className="btn mt-6 block m-auto bg-gray-500 text-white hover:bg-slate-800"
                >
                  {" "}
                  SELECT
                </button>
              </div>

              {/* 3rd Div */}

              <div className="bg-white w-3/4 m-auto  p-6 scroll-auto shadow-sm rounded-md">
                <h3 className="headingh4 text-center">Package: Silver</h3>
                {/* <span className="para">
                  <p>You will be treated as a normall user</p>
                </span> */}
                <div className="flex justify-around mt-2">
                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg shadow-md">
                    <h5 className="text-white para text-center font-bold">
                      Discount
                    </h5>
                    <h4 className="text-white para  text-center">20%</h4>
                  </div>

                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg  shadow-md">
                    <h5 className="text-white para text-center font-bold ">
                      Duration
                    </h5>
                    <h4 className="text-white para text-center">3/Months</h4>
                  </div>

                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg  shadow-md">
                    <h5 className="text-white para text-center font-bold">
                      Price
                    </h5>
                    <h4 className="text-white para  text-center">2000 Pk.r</h4>
                  </div>
                </div>

                <button
                  onClick={() => {
                    notify();

                    setMembership("silver");
                  }}
                  className="btn mt-6 block m-auto bg-gray-500 text-white hover:bg-slate-800"
                >
                  {" "}
                  SELECT
                </button>
              </div>

              {/* 4th DIV */}

              <div className="bg-white w-3/4 m-auto  p-6 scroll-auto shadow-sm rounded-md">
                <h3 className="headingh4 text-center">Package: Gold</h3>
                {/* <span className="para">
                  <p>You will be treated as a normall user</p>
                </span> */}
                <div className="flex justify-around mt-2">
                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg shadow-md">
                    <h5 className="text-white para text-center font-bold">
                      Discount
                    </h5>
                    <h4 className="text-white para  text-center">30%</h4>
                  </div>

                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg shadow-md ">
                    <h5 className="text-white para text-center font-bold ">
                      Duration
                    </h5>
                    <h4 className="text-white para text-center">6/Months</h4>
                  </div>

                  <div className="bg-green-400 inline-block px-4 p-2 rounded-lg shadow-md ">
                    <h5 className="text-white para text-center font-bold">
                      Price
                    </h5>
                    <h4 className="text-white para  text-center">3000 Pk.r</h4>
                  </div>
                </div>

                <button
                  onClick={() => {
                    notify();
                    setMembership("gold");
                  }}
                  className="btn mt-6 block m-auto bg-gray-500 text-white hover:bg-slate-800"
                >
                  {" "}
                  SELECT
                </button>
              </div>
            </div>
            <button
              onClick={handleRegister}
              type="submit"
              className="mt-6 w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
            >
              Create Account
            </button>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark ml-2"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark ml-2"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="text-grey-dark mt-6 mb-6">
            Already have an account?
            <Link
              to={"/login"}
              className="cursor-pointer no-underline border-b border-blue text-blue ml-2 hover:bg-green-600 bg-green-500 text-white p-2 rounded-md"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
