import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import { FiCreditCard, FiDollarSign, FiFlag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";
import UserLeftMenuBar from "../../../Components/UserLeftMenuBar";

function UserGround() {
  const [data, setData] = useState();

  const navigate = useNavigate();
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
          "https://ground-reservation-apis-production.up.railway.app/api/user/grounds",
          config
        );

        // Store the response data in state
        console.log(response);
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleImageError = (event) => {
    event.target.src =
      "https://www.espncricinfo.com/inline/content/image/335266.html?alt=2";
  };
  return (
    <div>
      <div className=" flex w-full">
        <div className=" hidden sm:block">
          <UserLeftMenuBar />
        </div>
        <TopNavigationBar />
        {/* *************************************** */}
        {/* CONTENT */}
        {/* *************************************** */}
        <div className=" w-full p-12  bg-gray-50 h-screen content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
          <h2 className="headingh4 text-2xl mt-8 ml-12">
            Avilable Grounds List
          </h2>
          <div className="flex flex-wrap gap-8 p-12 ">
            {data?.map((e, index) => {
              var id = e._id;
              var price = e.price;
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    navigate(`/user/ground/details/${id}`, {
                      state: { price },
                    });
                  }}
                >
                  {/* // to={} key={index}> */}
                  <div className="bg-white hover:bg-gray-200 cursor-pointer hover:shadow-2xl  w-72 h-80 overflow-hidden shadow-lg rounded-md">
                    <img
                      onError={handleImageError}
                      className="w-full h-1/2"
                      src={e.image}
                      alt=""
                    />

                    <h3 className="headingh4 font-semibold relative left-5 mt-3">
                      {e.name}
                    </h3>
                    <div className="flex justify-around  mt-2  gap-2 items-center p-4 ">
                      <div>
                        <FiFlag className="inline text-xl" />
                        Location:
                        <span className=" ml-2 para ">{e.location}</span>
                      </div>
                      <div>
                        <FiCreditCard className="inline text-xl mr-1" />
                        Fee:
                        <span className=" ml-2 para">{e.price}</span>
                      </div>
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

export default UserGround;
