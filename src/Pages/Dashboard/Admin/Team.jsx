import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AdminLeftBar from "../../../Components/Dashboard/AdminLeftBar";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import Swal from "sweetalert2/dist/sweetalert2.js";
// import withReactContent from "sweetalert2-react-content";
function Team() {
  const [data, setData] = useState();

  // const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set the JWT token in the headers
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Make the GET request
        const response = await axios.get(
          "https://ground-reservation-apis-production.up.railway.app/api/admin/team/request",
          config
        );

        // Store the response data in state
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [0]);

  const updateStatus = async (e) => {
    let token = localStorage.getItem("token");

    const putApiCall = async (e, status) => {
      console.log(status);
      let data2 = {
        status: status,
      };
      try {
        const response = await axios.put(
          "https://ground-reservation-apis-production.up.railway.app/api/admin/team/request/" +
            e,
          data2,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status == 200) {
          alert("Status updated");
        }
        console.log("Response:", response.data);
        // Handle success or other actions
      } catch (error) {
        console.error("Error:", error);
        // Handle error or show error message
      }
    };

    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          pending: "pending",
          approved: "approved",
          rejected: "rejected",
        });
      }, 1000);
    });
    const { value: status } = await Swal.fire({
      title: "Status",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Update status!";
        }
      },
    });

    if (status) {
      console.log(status);
      putApiCall(e, status);
    }
  };

  return (
    <div>
      <div className=" flex w-full">
        <div className=" hidden sm:block">
          <AdminLeftBar />
        </div>
        <TopNavigationBar />
        {/* *************************************** */}
        {/* CONTENT */}
        {/* *************************************** */}
        <div className="w-full p-12 bg-gray-50 h-full content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          <h2 className="headingh4 text-center text-2xl mt-12">
            Team Requests
          </h2>
          <div className="flex flex-wrap justify-center items-center p-12 gap-12">
            {data?.map((e, index) => {
              return (
                <div
                  key={index}
                  className="bg-white w-full sm:w-1/4 rounded-lg shadow-md "
                >
                  <div className="bg-gradient-to-r from-green-600 via-green-800 to-green-500 w-full h-20 rounded-md">
                    <h4 className="headingh3 text-center relative top-4 text-white">
                      {e.teamName}
                    </h4>
                    <h4 className="headingh3 text-center relative top-5 text-white">
                      Members: {e.totalParticipants}
                    </h4>
                  </div>
                  <img
                    className="relative "
                    src="https://bsmedia.business-standard.com/_media/bs/img/article/2021-11/11/full/1636613427-8694.jpg?im=FeatureCrop,width=826,height=465"
                    alt=""
                  />

                  <div className="p-3">
                    <label htmlFor="" className="headingh3 text-md">
                      Name
                    </label>
                    <span className=" ml-2 para">{e.name}</span>
                  </div>

                  <div className="px-3">
                    <label htmlFor="" className="headingh3 text-md">
                      Status
                    </label>
                    <span className=" ml-2 para">{e.status}</span>
                  </div>
                  <div className="p-3">
                    <label htmlFor="" className="headingh3 text-md">
                      Phone
                    </label>
                    <span className=" ml-2 para">{e.phoneNo}</span>
                  </div>

                  <div className="px-3 mb-5">
                    <label htmlFor="" className="headingh3 text-md">
                      SportsKit
                    </label>
                    <span className=" ml-2 para">
                      {e.isSportKit == false ? "No" : "Yes"}
                    </span>
                  </div>
                  <div className="bg-white p-2 flex items-center justify-center">
                    <button
                      onClick={() => {
                        updateStatus(e._id);
                      }}
                      className="btn bg-green-500 hover:bg-green-600 text-white"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
