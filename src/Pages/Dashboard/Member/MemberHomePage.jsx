import axios from "axios";
import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import MemberLeftMenuBar from "../../../Components/Dashboard/MemberLeftMenuBar";
import SilverImg from "../../../assets/silver.jpeg";
import BronzeImg from "../../../assets/bronze.avif";
import GoldImg from "../../../assets/gold.webp";
function MemberHomePage() {
  const [data, setData] = useState();

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
          "https://ground-reservation-apis-production.up.railway.app/api/member/profile",
          config
        );

        // Store the response data in state
        console.log(response);

        localStorage.setItem("profileURL", response.data.result.image);
        localStorage.setItem("userName", response.data.result.username);
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
  const membershipExpiryDate = convertDateFormat(data?.membershipExpiresAt);
  // console.log(data);
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
        <div className="w-full p-12 bg-gray-50 h-screen content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          <h2 className="headingh4 mt-8 p-8 headingh4 text-3xl">
            Welcome : {data?.username}
          </h2>
          <div className="float-right bg-white p-2 px-8 relative -top-20 rounded-md shadow-md ">
            <h2 className="buttonText text-center">Status</h2>
            <span className="para">{data?.membership}</span>
            {data?.membership == "bronze" ? (
              <img className="w-10 m-auto block mt-2" src={BronzeImg} alt="" />
            ) : data?.membership == "gold" ? (
              <img className="w-10 m-auto block mt-2" src={GoldImg} alt="" />
            ) : (
              <img className="w-10 m-auto block mt-2" src={SilverImg} alt="" />
            )}
          </div>
          <div className="flex flex-wrap  items-center justify-center gap-12 bg-gradient-to-r from-green-500 to-green-700 w-2/4 h-52  m-auto p-4 rounded-md shadow-md">
            <div>
              <h2 className="headingh4 text-center text-white"> MemberShip</h2>
              <h3 className="headingh3  text-center text-white">
                {data?.membership}
              </h3>
            </div>
            <div>
              <h2 className="headingh4 text-center text-white">
                Membership expires at
              </h2>
              <MdDateRange className="inline mr-2" />
              <h3 className="inline text-gray-100">{membershipExpiryDate}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberHomePage;
