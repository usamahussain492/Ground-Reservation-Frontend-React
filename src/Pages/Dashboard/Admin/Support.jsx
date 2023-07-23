import axios from "axios";
import { useEffect, useState } from "react";
import AdminLeftBar from "../../../Components/Dashboard/AdminLeftBar";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import Swal from "sweetalert2/dist/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/src/sweetalert2.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Support() {
  const MySwal = withReactContent(Swal);

  const [queries, setQueries] = useState();
  const [pending, setPendingQueries] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const MessageNotify = () => toast.success("updated");
  useEffect(() => {
    // Fetch data using Axios GET request
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
          "https://ground-reservation-apis-production.up.railway.app/api/admin/queries",
          config
        );

        // console.log(response);
        // Store the response data in state
        // totall 3 queries

        // [0] -- resolved (2)

        // [1]  -- pending (1)

        if (response.data.result[0]._id == "pending") {
          setPendingQueries(response.data.result[0]?.queries);
          setQueries(response.data.result[1]?.queries);

          // setQueries(undefined);
          // console.log(true);
        } else {
          setQueries(response.data.result[0]?.queries);

          setPendingQueries(response.data.result[1]?.queries);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleStatus = async (e) => {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          pending: "pending",
          resolved: "resolved",
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
      const updateData = async () => {
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const data = {
            status: status,
          };
          let selectedID = selectedItem;
          const response = await axios.put(
            `https://ground-reservation-apis-production.up.railway.app/api/admin/queries/${e}`,
            data,
            config
          );
          if (response.status == 200) {
            MessageNotify();
          }
        } catch (error) {
          console.error(error);
        }
      };

      updateData();
    }
  };

  return (
    <div className=" flex w-full">
      <div className=" hidden sm:block">
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
        <AdminLeftBar />
      </div>
      <TopNavigationBar />
      {/* *************************************** */}
      {/* CONTENT */}
      {/* *************************************** */}
      <div className="w-full p-12  bg-gray-50 h-full content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
        <h2 className="headingh4 p-12">Pending Queries</h2>
        <div className="flex flex-wrap gap-8 justify-center items-center px-12">
          {pending?.map((e, index) => {
            var indexValue = e._id;

            return (
              <div key={index} className="bg-white shadow-md rounded-lg ">
                <div className="bg-green-500 p-4 flex flex-wrap  justify-between items-center">
                  <div>
                    <h3 className="text-white headingh3">{e.user.username}</h3>
                    <span className="text-white para text-sm">
                      Email: {e.user.email}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg p-2 relative left-2">
                    <h3>{e.status}</h3>
                  </div>
                </div>

                <p className="p-4">{e.description}</p>

                <div className="w-full flex items-center justify-center mt-4 mb-2">
                  <button
                    onClick={() => {
                      setSelectedItem(indexValue), handleStatus(indexValue);
                    }}
                    className="btn bg-green-500 hover:bg-green-600 text-white"
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* << Apporved Quries List >> */}

        <h2 className="headingh4 p-12">Resolved Queries</h2>
        <div className="flex gap-8 justify-center items-center px-12">
          {queries?.map((e, index) => {
            var indexValue = e._id;

            return (
              <div key={index} className="bg-white shadow-md rounded-lg ">
                <div className="bg-green-500 p-4 flex flex-row justify-between items-center">
                  <div>
                    <h3 className="text-white headingh3">{e.user.username}</h3>
                    <span className="text-white para text-sm">
                      Email: {e.user.email}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg p-2 relative left-2">
                    <h3>{e.status}</h3>
                  </div>
                </div>

                <p className="p-4">{e.description}</p>

                <div className="w-full flex items-center justify-center mt-4 mb-2">
                  <button
                    onClick={() => {
                      setSelectedItem(indexValue), handleStatus(indexValue);
                    }}
                    className="btn bg-green-500 hover:bg-green-600 text-white"
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Support;
