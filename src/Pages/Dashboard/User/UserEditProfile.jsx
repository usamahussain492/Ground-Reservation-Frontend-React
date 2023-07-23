import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import UserLeftMenuBar from "../../../Components/UserLeftMenuBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserEditProfile() {
  const [inputForm, setInputForm] = useState({
    username: "",
    // email: "",
    phoneNo: "",
    password: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiDate, setApiData] = useState();
  const Successnotify = () => toast.sucess("Updated");

  useEffect(() => {
    const apiUrl =
      "https://ground-reservation-apis-production.up.railway.app/api/user/profile";
    const jwtToken = localStorage.getItem("token");

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setApiData(response.data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [0]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImgUpdate = async (e) => {
    e.preventDefault();
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("image", selectedFile);
    const jwtToken = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "https://ground-reservation-apis-production.up.railway.app/api/user/profile/change-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status == 200) {
        Successnotify();
      }
      console.log("Response:", response.data);
      // Handle success or other actions
    } catch (error) {
      console.error("Error:", error);
      // Handle error or show error message
    }
  };

  const updateDetails = async (e) => {
    e.preventDefault();
    console.log(selectedFile);
    const data = {
      username: inputForm.username,
      email: inputForm.email,
      phoneNo: inputForm.phoneNo,
      password: inputForm.password,
    };
    const jwtToken = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "https://ground-reservation-apis-production.up.railway.app/api/user/profile/change-details",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.status == 200) {
        Successnotify();
      }
      //   console.log("Response:", response.data);
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
        <div className="w-full p-12  border border-solid border-gray-300 bg-gray-50 h-full content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          <h2 className="text-center headingh4 mt-8">Your profile picture</h2>

          {apiDate?.image == null ? (
            <img
              className="m-auto block  rounded-full mt-4 shadow-lg"
              width={150}
              src="https://media.istockphoto.com/id/1392182937/vector/no-image-available-photo-coming-soon.jpg?s=170667a&w=0&k=20&c=HOCGNLwt3LkB92ZlyHAupxbwHY5X2143KDlbA-978dE="
              alt=""
            />
          ) : (
            <img
              src={apiDate?.image}
              alt="Default Profile"
              className="shadow-lg m-auto block  rounded-full mt-4 w-52 h-52 "
            />
          )}

          <div className="block m-auto text-center">
            <h2 className="text-center headingh4 mt-8">Select new picture</h2>
            <input
              onChange={handleFileChange}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs mt-2"
            />
          </div>

          <button
            onClick={handleImgUpdate}
            className="btn m-auto text-center block mt-12 bg-green-500 text-white"
          >
            Update
          </button>
          <div className="p-12">
            <h2 className="text-center headingh4 mt-8">Update Details</h2>

            <div className="bg-white shadow-md mt-4 p-6 rounded-md w-3/4  m-auto">
              <div className="flex items-center justify-around">
                <div className="">
                  <label htmlFor="" className="block">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder={apiDate?.username}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setInputForm((oldValue) => ({
                        ...oldValue,
                        username: e.target.value,
                      }));
                    }}
                    value={inputForm.username}
                  />
                </div>

                {/* <div>
                  <label htmlFor="" className="block ">
                    Email
                  </label>
                  <input
                    placeholder={apiDate?.email}
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setInputForm((oldValue) => ({
                        ...oldValue,
                        email: e.target.value,
                      }));
                    }}
                    value={inputForm.email}
                  />
                </div> */}
              </div>

              <div className="flex items-center justify-around mt-4">
                <div className="">
                  <label htmlFor="" className="block">
                    Phone No
                  </label>
                  <input
                    type="tel"
                    placeholder={apiDate?.phoneNo}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setInputForm((oldValue) => ({
                        ...oldValue,
                        phoneNo: e.target.value,
                      }));
                    }}
                    value={inputForm.phoneNo}
                  />
                </div>

                <div>
                  <label htmlFor="" className="block ">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      setInputForm((oldValue) => ({
                        ...oldValue,
                        password: e.target.value,
                      }));
                    }}
                    value={inputForm.password}
                  />
                </div>
              </div>

              <button
                onClick={updateDetails}
                className="btn m-auto text-center block mt-12 bg-green-500 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditProfile;
