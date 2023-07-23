import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import UserLeftMenuBar from "../../../Components/UserLeftMenuBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdClose } from "react-icons/md";
import { FiEdit, FiTrash } from "react-icons/fi";

import Swal from "sweetalert2/dist/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/src/sweetalert2.scss";
import MemberLeftMenuBar from "../../../Components/Dashboard/MemberLeftMenuBar";
function MemberGroundDetails() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [registerParticipants, setRegisterPartcipants] = useState();
  const [showDate1, setShowDate1] = useState(false);
  const [showDate2, setShowDate2] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [contactForm, setContactForm] = useState({
    email: "",
    name: "",
    description: "",
  });

  const [modal, setModal] = useState(false);

  const [requestModal, setRequestModal] = useState(false);

  const MySwal = withReactContent(Swal);

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
        "https://ground-reservation-apis-production.up.railway.app/api/member/contact-us",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setRequestModal(false);
        alert("Your complaint has been sent to the admin!");
      }
      //   console.log("Response:", response);
      // Handle success or other actions
    } catch (error) {
      console.error("Error:", error);
      // Handle error or show error message
    }
  };

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
          "https://ground-reservation-apis-production.up.railway.app/api/member/ground/" +
            id +
            "/reservations",
          config
        );

        // Store the response data in state

        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // console.log(data);
  const reserveGround = (e) => {
    e.preventDefault();

    const apiUrl =
      "https://ground-reservation-apis-production.up.railway.app/api/member/reservation";
    const jwtToken = localStorage.getItem("token");

    const postData = {
      groundId: id,
      from: fromDate,
      to: toDate,
      totalParticipants: registerParticipants,
    };

    axios
      .post(apiUrl, postData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          alert("Reservation is done");
        } else if (response.status == 400) {
          alert("Make Reservation from and to date same");
        }
        console.log("Response:", response);
      })
      .catch((error) => {
        alert("This ground is already booked for the specified time");
        console.error("Error:", error);
      });
  };
  function convertDateFormat(dateString) {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString();

    return `${formattedDate} ${formattedTime}`;
  }

  // const deleteReservation = () => {
  //   MySwal.fire({
  //     buttonsStyling: "false",
  //     icon: "warning",
  //     title: "Delete confirmation",
  //     text: "Are you sure you want to delete this ground?",
  //     confirmButtonText: "Yes Confirmed",
  //     confirmButtonColor: "black",
  //   }).then((event) => {
  //     if (event.isConfirmed == true) {
  //       const deleteData = async () => {
  //         let token = localStorage.getItem("token");
  //         try {
  //           const response = await axios.delete(
  //             `https://ground-reservation-apis-production.up.railway.app/api/user/reservation/${id}`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //                 "Content-Type": "application/json",
  //               },
  //             }
  //           );

  //           console.log("Response:", response.data);
  //           if (response.status == 200) {
  //             alert("Reservation Deleted");
  //           }
  //           // Handle success or other actions
  //         } catch (error) {
  //           console.error("Error:", error);
  //           // Handle error or show error message
  //         }
  //       };
  //       deleteData();
  //     }
  //   });
  // };
  return (
    <div>
      <div className=" flex w-full">
        <div className=" hidden sm:block">
          <MemberLeftMenuBar />
        </div>
        <TopNavigationBar />
        {/* *************************************** */}
        {/* CONTENT */}
        {/* *************************************** */}
        <div className="w-full p-24  bg-gray-50 h-screen content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          {/* MODAL LEVEL CONTENT */}
          {modal == true ? (
            <>
              <div className="bg-white w-1/2   p-8 shadow-lg rounded-md  border border-solids border-gray-300  absolute left-1/4 block m-auto">
                <MdClose
                  onClick={() => setModal(!modal)}
                  className="float-right text-2xl relative -top-5 left-5 cursor-pointer"
                />
                <h2 className="headingh3 text-center">
                  Register yourself for this ground
                </h2>
                <label htmlFor="" className="block">
                  From
                </label>
                <button
                  className="btn bg-gray-600 hover:bg-gray-700 p-2 text-white block"
                  onClick={() => setShowDate1(!showDate1)}
                >
                  Select Date
                </button>
                {showDate1 == true ? (
                  <Calendar
                    className="w-full mt-4 h-72 overflow-hidden rounded-md border-green-500"
                    onChange={setFromDate}
                    value={fromDate}
                  />
                ) : undefined}

                <label htmlFor="">To</label>

                <button
                  className="btn bg-gray-600 hover:bg-gray-700  p-2 text-white block"
                  onClick={() => setShowDate2(!showDate2)}
                >
                  Select Date
                </button>
                {showDate2 == true ? (
                  <Calendar
                    className="w-full mt-4 h-72 overflow-hidden rounded-md border-green-500"
                    onChange={setToDate}
                    value={toDate}
                  />
                ) : undefined}

                <label htmlFor="" className="block">
                  Totall number of partcipants
                </label>
                <input
                  type="number"
                  className="rounded-md border border-solid border-gray-300 indent-4 h-8"
                  name=""
                  id=""
                  value={registerParticipants}
                  onChange={(e) => {
                    setRegisterPartcipants(e.target.value);
                  }}
                />
                <button
                  onClick={reserveGround}
                  className="btn bg-green-500 hover:bg-green-600 text-white block m-auto mt-4"
                >
                  Reserve Now
                </button>
              </div>
            </>
          ) : undefined}

          <div className="flex items-center justify-between ">
            <div>
              <h2 className="headingh4 text-2xl mt-8 ml-12">
                My reservations:
              </h2>
            </div>
            {/* << MODIFY / EDIT MODEL CODE  >> */}
            {requestModal == true ? (
              <div className="bg-white absolute top-1/4 left-44 rounded-md shadow-md w-3/5 block m-auto p-6">
                <MdClose
                  className="float-right text-2xl cursor-pointer"
                  onClick={() => {
                    setRequestModal(false);
                  }}
                />
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
                  className="textarea textarea-bordered mt-4 w-full"
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
                    className="btn bg-green-500 hover:bg-green-600 mt-8 text-center block m-auto text-white"
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : undefined}

            <div>
              <button
                onClick={() => setModal(!modal)}
                className="btn bg-gray-600 hover:bg-gray-700 text-white"
              >
                Add New Reservation
              </button>
            </div>
          </div>

          <div className="flex flex-wrap mt-8 gap-12 p-12 items-center">
            {data !== undefined
              ? Object.keys(data).map(
                  (date) => (
                    console.log(data),
                    (
                      <div key={date}>
                        {data[date].map((obj, index) => {
                          const convertedDate = convertDateFormat(obj.from);
                          const convertedDate2 = convertDateFormat(obj.to);

                          return (
                            <div
                              key={index}
                              className="bg-white shadow-lg rounded-md p-4 block m-auto"
                            >
                              <span className=" bg-gray-600 mb-4 text-white m-auto block rounded-full p-1 text-center para text-lg">
                                Booked: {obj.booked ? "Yes" : "No"}
                              </span>
                              <h4 className="buttonText text-center font-semibold">
                                From:{" "}
                                <span className="font-medium">
                                  {convertedDate}
                                </span>{" "}
                              </h4>
                              <h4 className="buttonText text-center font-semibold mt-5">
                                To:{" "}
                                <span className="font-medium">
                                  {convertedDate2}
                                </span>{" "}
                              </h4>
                              <div className="mt-4 flex items-center justify-center">
                                <button
                                  onClick={() => {
                                    setRequestModal(true);
                                  }}
                                  className="btn bg-green-500 text-white hover:bg-green-600 ml-4"
                                >
                                  <FiEdit /> Request for change
                                </button>
                                {/* <button className="btn bg-green-500 text-white hover:bg-green-600">
                                  <FiEdit />
                                  EDIT
                                </button>
                                <button
                                  onClick={() => deleteReservation()}
                                  className="btn bg-red-400 text-white hover:bg-red-500 ml-4"
                                >
                                  <FiTrash />
                                  Delete
                                </button> */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )
                  )
                )
              : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberGroundDetails;
