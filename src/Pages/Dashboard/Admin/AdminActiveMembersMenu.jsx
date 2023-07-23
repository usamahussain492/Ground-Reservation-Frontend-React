import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import AdminLeftBar from "../../../Components/Dashboard/AdminLeftBar";
import TopNavigationBar from "../../../Components/Dashboard/TopNavigationBar";

function AdminActiveMembersMenu() {
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
          "https://ground-reservation-apis-production.up.railway.app/api/admin/members/active",
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
  //   console.log(data);

  function convertDateFormat(dateString) {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString();

    return `${formattedDate}`;
  }
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
            Member List 2
          </h2>

          <div className="flex flex-wrap gap-8  justify-center items-center mt-8">
            {data?.map((e, index) => {
              //   console.log(e);
              let expireat = convertDateFormat(e.membershipExpiresAt);
              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md w-full sm:w-3/5 overflow-hidden"
                >
                  <div className="flex gap-8 flex-row justify-between">
                    <div>
                      <h2 className="buttonText inline">Name: </h2>
                      <span className="inline para">{e.username}</span>
                      <div>
                        <h2 className="buttonText inline">Email: </h2>
                        <span className=" para">{e.email}</span>
                      </div>
                    </div>

                    <div>
                      <div>
                        <h2 className="buttonText inline">Membership: </h2>
                        <span className=" para">{e.membership}</span>
                      </div>
                      <div>
                        <h2 className="buttonText inline">Expiry Date: </h2>
                        <span className=" para">{expireat}</span>
                      </div>
                    </div>
                  </div>

                  <div className="justify-center items-center text-center mt-4">
                    <BiPhoneCall className="inline text-green-500 text-3xl" />{" "}
                    <h2 className="text-center headingh3 mt-4 inline">
                      Phone No.{e.phoneNo}
                    </h2>
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

export default AdminActiveMembersMenu;
