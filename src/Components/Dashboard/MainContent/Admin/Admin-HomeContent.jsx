import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Admin_HomeContent() {
  const [profile, setProfile] = useState();
  const [user, setUser] = useState();
  const [member, setMember] = useState();
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
          "https://ground-reservation-apis-production.up.railway.app/api/admin/profile",
          config
        );

        // Store the response data in state
        localStorage.setItem("profileURL", response.data.result.admin.image);
        localStorage.setItem("userName", response.data.result.admin.username);

        setProfile(response.data.result.stats);
      } catch (error) {
        console.error(error);
      }
    };

    const getMember = async () => {
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
          "https://ground-reservation-apis-production.up.railway.app/api/admin/users",
          config
        );

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    getMember();
  }, []);

  // console.log(profile);
  return (
    <div className="w-full bg-gray-50 h-screen content  transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
      <div className="p-8">
        <h3 className="headingh4 mt-4">Ground Reservation Stats</h3>
        <div className="flex justify-center items-center gap-8 flex-wrap mt-4">
          <div className="bg-white rounded-lg  shadow-lg">
            <div className="bg-green-500 px-4 py-2">
              <h3 className="text-white">Approved</h3>
            </div>
            <div className="p-4">
              <h2 className="para text-3xl text-center">
                {profile?.groundReservation.approved}
              </h2>
            </div>
          </div>

          {/* <<  Pending reservations >> */}

          <div className="bg-white rounded-lg  shadow-lg">
            <div className="bg-yellow-500 px-4 py-2">
              <h3 className="text-white">Pending</h3>
            </div>
            <div className="p-4">
              <h2 className="para text-3xl text-center">
                {profile?.groundReservation.pending}
              </h2>
            </div>
          </div>

          {/* <<  Rejected reservations >> */}

          <div className="bg-white rounded-lg  shadow-lg">
            <div className="bg-red-500 px-4 py-2">
              <h3 className="text-white">Rejected</h3>
            </div>
            <div className="p-4">
              <h2 className="para text-3xl text-center">
                {profile?.groundReservation.rejected}
              </h2>
            </div>
          </div>
        </div>

        {/* <<MORE DETAILED UI>>> */}

        <h2 className="headingh4">Stats:</h2>

        <div className="flex gap-8 flex-wrap mt-4 justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="headingh3 text-center text-gray-800">
              Totall Grounds
            </h3>
            <h2 className="prara text-center mt-4 text-3xl text-gray-700">
              {profile?.ground}
            </h2>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="headingh3 text-center text-gray-800 ">
              Totall Members
            </h3>
            <h2 className="prara text-center mt-4 text-3xl text-gray-700">
              {profile?.member}
            </h2>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="headingh3 text-center text-gray-800 ">
              Totall Users
            </h3>
            <h2 className="prara text-center mt-4 text-3xl text-gray-700">
              {profile?.user}
            </h2>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="headingh3 text-center text-gray-800">
              Tournement Arranged
            </h3>
            <h2 className="prara text-center mt-4 text-3xl text-gray-700">
              {profile?.tournament}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_HomeContent;
