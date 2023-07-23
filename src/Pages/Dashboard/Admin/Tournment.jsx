import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { HiClock, HiLocationMarker } from "react-icons/hi";
import { LuClock1 } from "react-icons/lu";
import AdminLeftBar from "../../../Components/Dashboard/AdminLeftBar";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { MdClose } from "react-icons/md";

function Tournment() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [leagueName, setLeagueName] = useState();
  const [groundList, setGroundList] = useState();
  const [selectedGround, setSelectedGround] = useState();

  const [tournamentTeams, setTournmentTeams] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [team3, setTeam3] = useState();
  const [team4, setTeam4] = useState();
  const [team5, setTeam5] = useState();
  const [team6, setTeam6] = useState();

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
          "https://ground-reservation-apis-production.up.railway.app/api/admin/tournament",
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

  function convertDateFormat(dateString) {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString();

    return `${formattedDate} ${formattedTime}`;
  }

  const createNewTournment = () => {
    const callGetRoundAPI = async () => {
      const token = localStorage.getItem("token");
      const apiUrl =
        "https://ground-reservation-apis-production.up.railway.app/api/admin/ground";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      axios
        .get(apiUrl, { headers })
        .then((response) => {
          // Handle the response from the API

          setGroundList(response.data.result);
          console.log("Response:", response.data.result);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error:", error);
        });
    };
    const getAllTeamAPI = async () => {
      const token = localStorage.getItem("token");
      const apiUrl =
        "https://ground-reservation-apis-production.up.railway.app/api/admin/team/request";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      axios
        .get(apiUrl, { headers })
        .then((response) => {
          // Handle the response from the API

          setTournmentTeams(response.data.result);
          console.log("Response:", response.data.result);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error:", error);
        });
    };

    callGetRoundAPI();
    getAllTeamAPI();
  };

  const callAddTournmentAPI = async () => {
    // Assuming you have your JWT token stored in a variable called 'token'
    const token = localStorage.getItem("token");

    // Assuming the API endpoint you want to make a request to is 'https://api.example.com/post'
    const apiUrl =
      "https://ground-reservation-apis-production.up.railway.app/api/admin/tournament";
    // Assuming you have some data to send in the request body
    const requestData = {
      name: leagueName,
      startDate: fromDate,
      endDate: toDate,
      ground: selectedGround,
      teamRequests: [team1, team2],
      // teamRequests: [team1, team2, team3, team4, team5, team6],
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
        if (response.status == 200) {
          alert("Ground has been added");
        }
        if (response.status == true) {
          alert("Ground has been added");
        }
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        alert("Ground has been added");
        console.error("Error:", error);
      });
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
        <div className="w-full p-12  bg-gray-50 h-full content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          <div className=" flex justify-between p-8">
            <h2 className="headingh4">Tournaments</h2>
            <button
              className="btn bg-green-500 text-white "
              onClick={() => {
                createNewTournment(), setModal(true);
              }}
            >
              Create New
            </button>
          </div>

          {/* << Model Code >> */}
          {modal == true ? (
            <>
              <div className="bg-white rounded-lg p-8 absolute shadow-lg w-4/5 h-auto block m-auto">
                <MdClose
                  className="float-right text-2xl cursor-pointer"
                  onClick={() => {
                    setModal(false);
                  }}
                />
                <h2 className="headingh4 text-center mt-2">
                  Enter Details To Create New Tournment
                </h2>
                <label htmlFor="" className="block mt-4 font-semibold">
                  Enter league name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs h-10"
                  value={leagueName}
                  onChange={(e) => {
                    setLeagueName(e.target.value);
                  }}
                />

                <label htmlFor="" className="block mt-4 font-semibold">
                  Start date
                </label>
                <DatePicker onChange={setFromDate} value={fromDate} />

                <label htmlFor="" className="block mt-4 font-semibold">
                  End date
                </label>
                <DatePicker onChange={setToDate} value={toDate} />

                <label htmlFor="" className="block mt-4 font-semibold">
                  Select ground
                </label>

                <div className="flex justify-center items-center flex-row">
                  {groundList?.map((e, index) => {
                    return (
                      <>
                        <div
                          onClick={() => {
                            alert("Ground is selected");
                            setSelectedGround(e._id);
                          }}
                          // key={index}
                          className="shadow-xl relative p-1 hover:bg-green-500 hover:shadow-lg hover:rounded-lg cursor-pointer"
                        >
                          <img
                            src={e.image}
                            className="w-28 h-28 rounded-md"
                            alt=""
                          />

                          <h5 className="absolute top-full font-semibold text-sm  text-gray-50 bg-green-500 bg-opacity-100 p-2 rounded-lg">
                            {e.name}
                          </h5>
                        </div>
                      </>
                    );
                  })}
                </div>

                <label htmlFor="" className="block mt-4 font-semibold mb-2">
                  Select Team
                </label>

                <div className=" shadow-md mt-4 p-4 h-56 overflow-hidden overflow-y-scroll block">
                  <label htmlFor="" className="block mt-12">
                    Select Team 1
                  </label>

                  <div className="flex flex-row gap-6">
                    {tournamentTeams?.map((e, index) => {
                      console.log(e);
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            alert("Team is selected");
                            setTeam1(e._id);
                          }}
                          // key={index}
                          className="shadow-md relative p-3 hover:bg-gray-100 hover:rounded-lg cursor-pointer text-center"
                        >
                          <h5 className=" font-semibold text-sm  text-gray-700 p-1 rounded-lg">
                            Team: {e.teamName}
                          </h5>
                          <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                            Participants: {e.totalParticipants}
                          </h5>
                          <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                            Phone #: {e.phoneNo}
                          </h5>
                        </div>
                      );
                    })}
                  </div>

                  <label htmlFor="" className="block mt-12">
                    Select Team 2
                  </label>

                  <div className="flex flex-row gap-6">
                    {tournamentTeams?.map((e, index) => {
                      // console.log(e);
                      return (
                        <>
                          <div
                            onClick={() => {
                              alert("Team 2 is selected");
                              setTeam2(e._id);
                            }}
                            key={index}
                            className="shadow-md relative p-3 hover:bg-gray-100 hover:rounded-lg cursor-pointer text-center"
                          >
                            <h5 className=" font-semibold text-sm  text-gray-700 p-1 rounded-lg">
                              Team: {e.teamName}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Participants: {e.totalParticipants}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Phone #: {e.phoneNo}
                            </h5>
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <label htmlFor="" className="block mt-12">
                    Select Team 3
                  </label>

                  <div className="flex flex-row gap-6">
                    {tournamentTeams?.map((e, index) => {
                      // console.log(e);
                      return (
                        <>
                          <div
                            onClick={() => {
                              alert("Team 2 is selected");
                              setTeam3(e._id);
                            }}
                            key={index}
                            className="shadow-md relative p-3 hover:bg-gray-100 hover:rounded-lg cursor-pointer text-center"
                          >
                            <h5 className=" font-semibold text-sm  text-gray-700 p-1 rounded-lg">
                              Team: {e.teamName}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Participants: {e.totalParticipants}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Phone #: {e.phoneNo}
                            </h5>
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <label htmlFor="" className="block mt-12">
                    Select Team 4
                  </label>

                  <div className="flex flex-row gap-6">
                    {tournamentTeams?.map((e, index) => {
                      // console.log(e);
                      return (
                        <>
                          <div
                            onClick={() => {
                              alert("Team 2 is selected");
                              setTeam4(e._id);
                            }}
                            key={index}
                            className="shadow-md relative p-3 hover:bg-gray-100 hover:rounded-lg cursor-pointer text-center"
                          >
                            <h5 className=" font-semibold text-sm  text-gray-700 p-1 rounded-lg">
                              Team: {e.teamName}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Participants: {e.totalParticipants}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Phone #: {e.phoneNo}
                            </h5>
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <label htmlFor="" className="block mt-12">
                    Select Team 5
                  </label>

                  <div className="flex flex-row gap-6">
                    {tournamentTeams?.map((e, index) => {
                      // console.log(e);
                      return (
                        <>
                          <div
                            onClick={() => {
                              alert("Team 2 is selected");
                              setTeam5(e._id);
                            }}
                            key={index}
                            className="shadow-md relative p-3 hover:bg-gray-100 hover:rounded-lg cursor-pointer text-center"
                          >
                            <h5 className=" font-semibold text-sm  text-gray-700 p-1 rounded-lg">
                              Team: {e.teamName}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Participants: {e.totalParticipants}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Phone #: {e.phoneNo}
                            </h5>
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <label htmlFor="" className="block mt-12">
                    Select Team 6
                  </label>

                  <div className="flex flex-row gap-6">
                    {tournamentTeams?.map((e, index) => {
                      // console.log(e);
                      return (
                        <>
                          <div
                            onClick={() => {
                              alert("Team 2 is selected");
                              setTeam6(e._id);
                            }}
                            key={index}
                            className="shadow-md relative p-3 hover:bg-gray-100 hover:rounded-lg cursor-pointer text-center"
                          >
                            <h5 className=" font-semibold text-sm  text-gray-700 p-1 rounded-lg">
                              Team: {e.teamName}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Participants: {e.totalParticipants}
                            </h5>
                            <h5 className=" font-semibold text-sm  text-gray-700  p-1 ">
                              Phone #: {e.phoneNo}
                            </h5>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    callAddTournmentAPI();
                  }}
                  className="btn w-80 bg-green-500 hover:bg-green-600 text-white  text-center block m-auto mt-4"
                >
                  ADD
                </button>
              </div>
            </>
          ) : undefined}
          <div className="flex p-12 gap-12 flex-wrap justify-center items-center">
            {data?.map((e, index) => {
              const startDate = convertDateFormat(e.startDate);
              const endDate = convertDateFormat(e.endDate);
              console.log(e);
              return (
                <div
                  key={index}
                  className="bg-white  w-full sm:w-1/3 rounded-md shadow-md"
                >
                  <div className="bg-green-500 p-5 rounded-md shadow-lg">
                    <h2 className="headingh4 text-center text-white">
                      Name:{e.name}
                    </h2>
                  </div>

                  <div className="bg-white p-4">
                    <div className="flex justify-around">
                      <div>
                        <div className="font-semibold">
                          Ground:{" "}
                          <div className="font-normal">
                            {e.ground == null ? "Null" : ` ${e.ground.name}`}
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold">
                          Status:
                          <span className="font-normal">{e.status}</span>{" "}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-around mt-8">
                      <span className="font-semibold">
                        <HiLocationMarker className="inline text-gray-700 text-3xl" />
                        Location:
                        <span className="font-normal ml-1">Lahore</span>
                      </span>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-2 mt-8 shadow-lg">
                      <div className="flex justify-around">
                        <h4 className="para text-white">{e.teams[0].name}</h4>
                        <span className="headingh4 text-white">VS</span>
                        <h4 className="para text-white">{e.teams[1].name}</h4>
                      </div>
                    </div>

                    <div className="flex justify-center items-center mt-12">
                      <LuClock1 className="mr-2 text-3xl" />{" "}
                      <h3>From: {startDate}</h3>
                      <HiClock className="ml-12 mr-2 text-4xl" />{" "}
                      <h3>To: {endDate} </h3>
                    </div>
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

export default Tournment;
