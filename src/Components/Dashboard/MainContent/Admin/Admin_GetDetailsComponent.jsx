import axios, { toFormData } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/src/sweetalert2.scss";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { MdClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin_GetDetailsComponent() {
  const [pendingData, setPendingData] = useState();
  const [approvedData, setApprovedData] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [rejectedData, setRejectedData] = useState();
  const [modal, setModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [totalParticipants, setTotalParticipants] = useState(Number);

  const { id } = useParams();
  const MessageNotify = () => toast.success("Updated");
  const Errornotify = () => toast.error("Delted");
  const MySwal = withReactContent(Swal);
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
          "https://ground-reservation-apis-production.up.railway.app/api/admin/reservation/" +
            id,
          config
        );

        // Store the response data in state
        // setRejectedData(response.data.result[0].reservations);
        // setApprovedData(response.data.result[index]);
        // setPendingData(response.data.result[index].reservations);

        if (response) {
          for (let index = 0; index < 3; index++) {
            if (response.data.result[index].status == "approved") {
              setApprovedData(response.data.result[index].reservations);
            } else if (response.data.result[index].status == "pending") {
              setPendingData(response.data.result[index].reservations);
            } else if (response.data.result[index].status == "rejected")
              setRejectedData(response.data.result[index].reservations);
          }
        }

        // if (response.data.result.length == 3) {

        //   setApprovedData(response.data.result[2].reservations);
        // }

        // if (response.data.result.length == 2) {
        //   setRejectedData(response.data.result[0].reservations);
        //   setPendingData(response.data.result[1].reservations);
        //   setApprovedData(response.data.result[2].reservations);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // console.log(selectedItem);
  // console.log(pendingData);
  const handleStatus = async (e) => {
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
            `https://ground-reservation-apis-production.up.railway.app/api/admin/reservation/${e}`,
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

  const handleDelete = (e) => {
    // console.log(e);
    MySwal.fire({
      buttonsStyling: "false",
      icon: "warning",
      title: "Delete confirmation",
      text: "Are you sure you want to delete this ground?",
      confirmButtonText: "Yes Confirmed",
      confirmButtonColor: "black",
    }).then((event) => {
      if (event.isConfirmed == true) {
        const deleteData = async () => {
          try {
            const token = localStorage.getItem("token");
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            // console.log(selectedItem);
            const response = await axios.delete(
              "https://ground-reservation-apis-production.up.railway.app/api/admin/reservation/" +
                e,
              config
            );
            console.log(response);
            if (response.status == 200) {
              Errornotify();
            }
          } catch (error) {
            console.error(error);
          }
        };
        deleteData();
      }
    });
  };

  return (
    <div className="w-full p-12 bg-gray-50  content  transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
      <h1 className="headingh3 text-gray-800 text-2xl mt-8 text-center">
        Ground Details
      </h1>

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

      {modal == true ? (
        <div className="bg-white shadow-lg  rounded-md border-2 border-solid border-gray-200 p-6 absolute top-20 left-1/4 w-1/2  m-auto  ">
          <MdClose
            className="text-2xl float-right cursor-pointer"
            onClick={() => setModal(false)}
          />
          <h2 className="headingh4 text-gray-800 text-center">
            Enter updated details
          </h2>

          <form action="" className="">
            <label htmlFor="" className="block mt-4">
              From
            </label>
            <DatePicker onChange={setFromDate} value={fromDate} />
            <label htmlFor="" className="block mt-4">
              To
            </label>
            <DatePicker onChange={setToDate} value={toDate} />
            <label htmlFor="" className="block mt-4">
              Enter Participants Number
            </label>
            <input
              className="border border-solid border-gray-400 p-2 rounded-md"
              type="number"
              name="Number"
              id=""
              value={totalParticipants}
              onChange={(e) => {
                setTotalParticipants(e.target.value);
              }}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                function convertToDate(dateString) {
                  // const dateWithoutTimeZone = dateString.replace("Z", "");

                  return new Date(dateString);
                }

                const string1 = JSON.stringify(fromDate);
                // console.log(string1);
                const string2 = JSON.stringify(toFormData);

                // const dateString = "2023-05-30T19:00:00.000Z";
                const dateObject = convertToDate(string1);
                const dateObject2 = convertToDate(string2);

                //input data
                const fromDate2 = new Date("2023-06-30");
                const toDate2 = new Date("2023-07-05");
                // console.log(fromDate2);
                // console.log(toDate2);
                // console.log(selectedItem);
                const requestData = {
                  from: fromDate2,
                  to: toDate2,
                  totalParticipants: totalParticipants,
                };

                // Bearer token value
                const bearerToken = localStorage.getItem("token");

                // API endpoint URL
                const apiUrl = `https://ground-reservation-apis-production.up.railway.app/api/admin/reservation/update/time/${selectedItem}`; // Set the request headers with the Bearer token
                const headers = {
                  Authorization: `Bearer ${bearerToken}`,
                };

                // Make the POST request with Axios
                axios
                  .put(apiUrl, requestData, { headers })
                  .then((response) => {
                    // console.log(response);
                    if (response.status == 200) {
                      MessageNotify();
                    }
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }}
              className="btn bg-green-500 block m-auto mt-12 shadow-lg text-white hover:bg-green-600"
            >
              UPDATE
            </button>
          </form>
        </div>
      ) : undefined}
      <h2 className="headingh4 mt-8 text-gray-700">Pending Reservations</h2>

      <div className="flex flex-wrap mt-4 gap-12 p-4 items-center justify-center">
        {pendingData?.map((e, index) => {
          var indexValue = e._id;
          var fromDate = new Date(e.from);
          var toDate = new Date(e.to);

          const options = { year: "numeric", month: "long", day: "numeric" };
          fromDate = fromDate.toLocaleDateString(undefined, options);
          toDate = toDate.toLocaleDateString(undefined, options);
          // console.log(e);
          return (
            <>
              <div className="bg-white rounded-md w-2/6">
                <div className="bg-white p-4 shadow-md">
                  <h5 className="float-right block bg-green-500 rounded-full p-2 text-white -mt-2 para">
                    {e.status}{" "}
                  </h5>
                  <span className="block button buttonText text-xl p-2">
                    Totall Participants
                  </span>

                  <p className="text-center text-4xl headingh4 mt-4 ">
                    {e.totalParticipants}
                  </p>

                  <div className="flex  justify-center">
                    <span className="font-semibold text-sm">Mail: </span>
                    <span className=" text-sm ml-2 "> {e.user.email}</span>
                  </div>
                  <div className="flex  justify-center">
                    <span className="font-semibold text-sm">User: </span>
                    <span className=" text-sm ml-2 "> {e.user.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <LuClock className="inline" />

                      <h5>{fromDate}</h5>
                    </div>
                    <div>
                      <FaClock className="inline" />
                      <h5>{toDate}</h5>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-1 flex justify-around mb-2 ">
                  <button
                    onClick={() => {
                      handleStatus(indexValue);
                      // setSelectedItem(indexValue), handleStatus();
                    }}
                    className="btn bg-green-500 text-white hover:bg-green-600"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(indexValue), setModal(true);
                    }}
                    className="btn bg-blue-500 text-white  hover:bg-blue-600"
                  >
                    {" "}
                    Update
                  </button>
                  <button
                    onClick={(e) => {
                      // setSelectedItem(indexValue);
                      // handleDelete(e);
                      handleDelete(indexValue);
                    }}
                    className="btn bg-red-500 text-white hover:bg-red-600"
                  >
                    {" "}
                    Remove
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <h2 className="headingh4 mt-8 text-gray-700">Approved Reservations</h2>

      <div className="flex flex-wrap mt-4 gap-12 p-4 items-center justify-center">
        {approvedData?.map((e, index) => {
          // console.log("proper formated data");
          // console.log(e);
          var indexValue = e._id;
          var fromDate = new Date(e.from);
          var toDate = new Date(e.to);

          const options = { year: "numeric", month: "long", day: "numeric" };
          fromDate = fromDate.toLocaleDateString(undefined, options);
          toDate = toDate.toLocaleDateString(undefined, options);

          return (
            <>
              <div key={index} className="bg-white rounded-md w-96 sm:w-2/6">
                <div className="bg-white p-4 shadow-md">
                  <h5 className="float-right block bg-green-500 rounded-full p-2 text-white -mt-2 para">
                    {e.status}
                  </h5>
                  <span className="block button buttonText text-xl p-2">
                    Totall Participants
                  </span>

                  <p className="text-center text-4xl headingh4 mt-4 ">
                    {e.totalParticipants}
                  </p>
                  <div className="flex  justify-center">
                    <span className="font-semibold text-sm">Mail: </span>
                    <span className=" text-sm ml-2 "> {e.user.email}</span>
                  </div>
                  <div className="flex  justify-center">
                    <span className="font-semibold text-sm">User: </span>
                    <span className=" text-sm ml-2 "> {e.user.username}</span>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <LuClock className="inline" />

                      <h5>{fromDate}</h5>
                    </div>
                    <div>
                      <FaClock className="inline" />
                      <h5>{toDate}</h5>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-1 flex justify-around mb-2 ">
                  <button
                    onClick={() => {
                      handleStatus(indexValue);
                      // setSelectedItem(indexValue), handleStatus();
                    }}
                    className="btn bg-green-500 text-white hover:bg-green-600"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(indexValue), setModal(true);
                    }}
                    className="btn bg-blue-500 text-white  hover:bg-blue-600"
                  >
                    {" "}
                    Update
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(indexValue);
                      // setSelectedItem(indexValue);
                      // setTimeout(() => {
                      //   handleDelete(e);
                      // }, 500);
                    }}
                    className="btn bg-red-500 text-white hover:bg-red-600"
                  >
                    {" "}
                    Remove
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <h2 className="headingh4 mt-8 text-gray-700">Rejected Reservations</h2>

      <div className="flex flex-wrap mt-4 gap-12 p-4 items-center justify-center">
        {rejectedData?.map((e, index) => {
          // console.log("proper formated data");
          // console.log(e);
          var indexValue = e._id;
          var fromDate = new Date(e.from);
          var toDate = new Date(e.to);

          const options = { year: "numeric", month: "long", day: "numeric" };
          fromDate = fromDate.toLocaleDateString(undefined, options);
          toDate = toDate.toLocaleDateString(undefined, options);

          return (
            <>
              <div key={index} className="bg-white rounded-md w-96 sm:w-2/6">
                <div className="bg-white p-4 shadow-md">
                  <h5 className="float-right block bg-green-500 rounded-full p-2 text-white -mt-2 para">
                    {e.status}
                  </h5>
                  <span className="block button buttonText text-xl p-2">
                    Totall Participants
                  </span>

                  <p className="text-center text-4xl headingh4 mt-4 ">
                    {e.totalParticipants}
                  </p>
                  <div className="flex  justify-center">
                    <span className="font-semibold text-sm">Mail: </span>
                    <span className=" text-sm ml-2 "> {e.user.email}</span>
                  </div>
                  <div className="flex  justify-center">
                    <span className="font-semibold text-sm">User: </span>
                    <span className=" text-sm ml-2 "> {e.user.username}</span>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <LuClock className="inline" />

                      <h5>{fromDate}</h5>
                    </div>
                    <div>
                      <FaClock className="inline" />
                      <h5>{toDate}</h5>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-1 flex justify-around mb-2 ">
                  <button
                    onClick={(e) => {
                      // console.log(indexValue);
                      handleStatus(indexValue);
                      // setSelectedItem(indexValue),
                    }}
                    className="btn bg-green-500 text-white hover:bg-green-600"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(indexValue), setModal(true);
                    }}
                    className="btn bg-blue-500 text-white  hover:bg-blue-600"
                  >
                    {" "}
                    Update
                  </button>
                  <button
                    onClick={(e) => {
                      // setSelectedItem(indexValue);
                      handleDelete(indexValue);
                    }}
                    className="btn bg-red-500 text-white hover:bg-red-600"
                  >
                    {" "}
                    Remove
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Admin_GetDetailsComponent;
