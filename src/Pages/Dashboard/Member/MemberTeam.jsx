import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import MemberLeftMenuBar from "../../../Components/Dashboard/MemberLeftMenuBar";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2/dist/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/src/sweetalert2.scss";
import { MdClose, MdOutlineDateRange } from "react-icons/md";
function MemberTeam() {
  const [modal, setModal] = useState(false);
  const [modalOption, setModalOption] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  console.log(selectedOption);
  const [data, setData] = useState();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    team: "",
    participants: "",
    additionalInfo: "",
  });

  const [selectedItemID, setSelectedItemID] = useState();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // Fetch data using Axios GET request
    const fetchData = async () => {
      d;
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
          "https://ground-reservation-apis-production.up.railway.app/api/member/team/request",
          config
        );

        // Store the response data in state
        // console.log(response);
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //   console.log(data);

  const saveTeam = async (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      email: form.email,
      phoneNo: form.phone,
      teamName: form.team,
      totalParticipants: form.participants,
      isSportKit: selectedOption,
      additionalInfo: form.additionalInfo,
      from: fromDate,
      to: toDate,
    };

    const jwtToken = localStorage.getItem("token");

    if (modalOption == "Team Request") {
      try {
        const response = await axios.post(
          "https://ground-reservation-apis-production.up.railway.app/api/member/team/request",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.status == 200) {
          alert("Team added");
        }

        console.log("Response:", response.data);
        // Handle success or other actions
      } catch (error) {
        console.error("Error:", error);
        // Handle error or show error message
      }
    } else {
      try {
        const response = await axios.put(
          `https://ground-reservation-apis-production.up.railway.app/api/member/team/request/${selectedItemID}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.status == 200) {
          alert("Team Updated");
          setModal(false);
        }

        console.log("Response:", response.data);
        // Handle success or other actions
      } catch (error) {
        console.error("Error:", error);
        // Handle error or show error message
      }
    }
  };

  function convertDateFormat(dateString) {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString();
    // const formattedTime = dateObj.toLocaleTimeString();

    return `${formattedDate} `;
  }

  const deleteReservation = (e) => {
    MySwal.fire({
      buttonsStyling: "false",
      icon: "warning",
      title: "Delete confirmation",
      text: "Are you sure you want to delete this ground?",
      confirmButtonText: "Yes Confirmed",
      confirmButtonColor: "black",
    }).then((event) => {
      if (event.isConfirmed == true) {
        const deleteData = async (e) => {
          let token = localStorage.getItem("token");
          try {
            const response = await axios.delete(
              `https://ground-reservation-apis-production.up.railway.app/api/member/team/request/${e}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("Response:", response.data);
            if (response.status == 200) {
              alert("Team Request Deleted");
            }
            // Handle success or other actions
          } catch (error) {
            console.error("Error:", error);
            // Handle error or show error message
          }
        };
        deleteData(e);
      }
    });
  };

  return (
    <div className=" flex w-full">
      <div className=" hidden sm:block">
        <MemberLeftMenuBar />
      </div>
      <TopNavigationBar />
      {/* *************************************** */}
      {/* CONTENT */}
      {/* *************************************** */}
      <div className="w-full p-12 bg-gray-50 h-screen content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
        <div className="flex justify-between items-center">
          <h2 className="headingh4 p-8 text-center text-2xl">Team Requests</h2>

          <button
            onClick={() => {
              setModal(true);
              setModalOption("Team Request");
            }}
            className="btn bg-green-500 hover:bg-green-600 text-white float-right relative right-14"
          >
            Add Team Requests
          </button>
        </div>
        {/* << Modal Content >> */}

        {modal == true ? (
          <div className="absolute bg-white rounded-lg shadow-md w-4/5 h-auto top-28 flex flex-col justify-center items-center py-8">
            <MdClose
              className="float-right relative left-96 text-2xl cursor-pointer"
              onClick={() => {
                setModal(false);
              }}
            />
            <div className="flex items-center gap-6">
              <div>
                <label htmlFor="" className="block">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full max-w-xs"
                  value={form.name}
                  onChange={(e) => {
                    setForm((old) => ({ ...old, name: e.target.value }));
                  }}
                />
              </div>
              <div>
                <label htmlFor="" className="block">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  className="input input-bordered w-full max-w-xs"
                  value={form.email}
                  onChange={(e) => {
                    setForm((old) => ({ ...old, email: e.target.value }));
                  }}
                />
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <div>
                <label htmlFor="" className="block">
                  Phone No
                </label>
                <input
                  type="tel"
                  placeholder="+92000-123"
                  className="input input-bordered w-full max-w-xs"
                  value={form.phone}
                  onChange={(e) => {
                    setForm((old) => ({ ...old, phone: e.target.value }));
                  }}
                />
              </div>
              <div>
                <label htmlFor="" className="block">
                  Team Name
                </label>
                <input
                  type="text"
                  placeholder="Team"
                  className="input input-bordered w-full max-w-xs"
                  value={form.team}
                  onChange={(e) => {
                    setForm((old) => ({ ...old, team: e.target.value }));
                  }}
                />
              </div>
            </div>

            <div className="flex gap-6 mt-4 ">
              <div className="w-44">
                <label htmlFor="" className="block">
                  Totall Participants
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                  value={form.participants}
                  onChange={(e) => {
                    setForm((old) => ({
                      ...old,
                      participants: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex  items-center">
                <label htmlFor="" className="block">
                  Wana avail sports-kit?
                </label>
                <label className="ml-2">
                  <input
                    type="radio"
                    name="kit"
                    value="yes"
                    checked={selectedOption === "yes"}
                    onChange={handleOptionChange}
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2">Yes</span>
                </label>

                <label className="inline-flex items-center ml-2">
                  <input
                    type="radio"
                    name="kit"
                    value="no"
                    checked={selectedOption === "no"}
                    onChange={handleOptionChange}
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div className="flex gap-6 mt-1">
              <div>
                <label htmlFor="" className="block mt-4">
                  From
                </label>
                <DatePicker onChange={setFromDate} value={fromDate} />
              </div>
              <div>
                <label htmlFor="" className="block mt-4">
                  To
                </label>
                <DatePicker onChange={setToDate} value={toDate} />
              </div>
            </div>

            <label htmlFor="" className="block mt-4">
              Additional Info
            </label>
            <input
              type="text"
              placeholder="Any details you wana mention?"
              className="input input-bordered w-full max-w-xs"
              value={form.additionalInfo}
              onChange={(e) => {
                setForm((old) => ({ ...old, additionalInfo: e.target.value }));
              }}
            />
            <button
              onClick={saveTeam}
              className="btn bg-green-500 hover:bg-green-600 text-white mt-4 border border-gray-300  border-solid"
            >
              Submit
            </button>
          </div>
        ) : undefined}

        {/* << Modal Content Ending Herer >> */}

        {/* << Main Cards UI >> */}

        <div className="w-full gap-6 sm:w-10/12 flex flex-wrap  m-auto mt-8">
          {data?.map((e, index) => {
            const from = convertDateFormat(e.from);
            const to = convertDateFormat(e.to);
            return (
              <div className="bg-white rounded-md shadow-md  p-5" key={index}>
                <div>
                  <h3 className="headingh4 text-2xl font-medium text-center">
                    {e.teamName}
                  </h3>
                </div>

                <span className="buttonText text-center text-gray-600">
                  Totall Members
                </span>

                <h2 className="heading3 text-5xl text-center">
                  {e.totalParticipants}
                </h2>

                <div className="flex items-center justify-center mt-4">
                  <div>
                    <MdOutlineDateRange className="inline" />
                    <span className="buttonText">{from}</span>
                  </div>
                  <div>
                    <span className="text-2xl font-light  ml-4 mr-4">to</span>
                  </div>

                  <div>
                    <MdOutlineDateRange className="inline" />
                    <span className="buttonText">{to}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div>
                    <span>Sport-Kit: </span>
                    <span className="font-semibold">
                      {e.isSportKit == true ? "Yes" : "No"}
                    </span>
                  </div>

                  <div>
                    <span className=" bg-green-500 text-white p-2 rounded-full">
                      {e.status}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <span className=" ">Email:</span>
                  <span className="font-semibold"> {e.email}</span>
                </div>

                <div className="flex justify-between gap-2 mt-4">
                  <button
                    onClick={() => {
                      setModal(true);
                      setSelectedItemID(e._id);
                      setModalOption("Edit Team");
                    }}
                    className="w-1/2 bg-green-500 hover:bg-green-600 text-white btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteReservation(e._id);
                    }}
                    className="w-1/2 bg-red-500 hover:bg-red-600 text-white btn"
                  >
                    Delete
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

export default MemberTeam;
