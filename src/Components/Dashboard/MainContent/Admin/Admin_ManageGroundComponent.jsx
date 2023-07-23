import axios from "axios";
import { useEffect, useState } from "react";
import { FaLocationArrow, FaMoneyCheckAlt } from "react-icons/fa";
import { FiEdit, FiInfo, FiTrash } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Admin_ManageGroundComponent() {
  const [inputValues, setInputValues] = useState({
    name: "",
    location: "",
    pricing: "",
    description: "",
  });
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [activeID, setActiveID] = useState();
  const MySwal = withReactContent(Swal);
  const notify = () => toast.info("Ground Details Updated!");
  const notifyError = () => toast.warning("Try again");
  const Successnotify = () => toast.sucess("");
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
          "https://ground-reservation-apis-production.up.railway.app/api/admin/ground",
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
  // console.log(data);

  return (
    <div className="w-full p-12 bg-gray-50  content  transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4">
      <h1 className="headingh3 text-gray-800 text-2xl mt-8 text-center">
        All Registered Grounds
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
              Ground name
            </label>
            <input
              value={inputValues.name}
              onChange={(e) => {
                setInputValues((old) => ({
                  ...old,
                  name: e.target.value,
                }));
              }}
              type="text"
              placeholder="Ali ground"
              className="input h-10 input-bordered w-full max-w-xs"
            />

            <label htmlFor="" className="block mt-4">
              Ground location
            </label>
            <input
              value={inputValues.location}
              onChange={(e) => {
                setInputValues((old) => ({
                  ...old,
                  location: e.target.value,
                }));
              }}
              type="text"
              placeholder="F-9 Park ISB"
              className="input h-10 input-bordered w-full max-w-xs"
            />

            <label htmlFor="" className="block mt-4">
              Ground Pricing
            </label>
            <input
              value={inputValues.pricing}
              onChange={(e) => {
                setInputValues((old) => ({
                  ...old,
                  pricing: e.target.value,
                }));
              }}
              type="text"
              placeholder=""
              className="input h-10 input-bordered w-full max-w-xs"
            />

            <label htmlFor="" className="block mt-4">
              Ground Description
            </label>
            <textarea
              value={inputValues.description}
              onChange={(e) => {
                setInputValues((old) => ({
                  ...old,
                  description: e.target.value,
                }));
              }}
              className="textarea textarea-bordered w-full"
              placeholder="Enter details here"
            ></textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                //input data
                const requestData = {
                  name: inputValues.name,
                  location: inputValues.location,
                  description: inputValues.description,
                  price: inputValues.pricing,
                };

                // Bearer token value
                const bearerToken = localStorage.getItem("token");

                // API endpoint URL
                const apiUrl =
                  "https://ground-reservation-apis-production.up.railway.app/api/admin/ground/" +
                  activeID;

                // Set the request headers with the Bearer token
                const headers = {
                  Authorization: `Bearer ${bearerToken}`,
                };

                // Make the POST request with Axios
                axios
                  .patch(apiUrl, requestData, { headers })
                  .then((response) => {
                    if (response.status == 200) {
                      notify();
                    } else {
                      notifyError();
                    }
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }}
              className="btn bg-green-500 block m-auto mt-12 shadow-lg text-white hover:bg-green-600"
            >
              Add Now
            </button>
          </form>
        </div>
      ) : undefined}
      <div className="flex gap-6 flex-wrap p-2 mt-8  justify-center ">
        {data?.map((e, index) => {
          var id = e._id;
          return (
            <>
              <div
                key={index}
                className="bg-white p-4 mb-16 rounded-md shadow-md w-2/3  hover:bg-gray-200 hover:border border-solid border-gray-300 cursor-pointer hover:shadow-xl"
              >
                <div className="flex items-center gap-12">
                  <img
                    className="rounded-full  w-24 h-24 shadow-lg"
                    src={e.image}
                    alt=""
                  />

                  <div>
                    <h2 className="headingh4">{e.name}</h2>
                    <p className="text-gray-600 mt-1">{e.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-around gap-12 mt-4">
                  <div>
                    <FaLocationArrow className="inline text-xl" />
                    <span className=" ml-2 para">{e.location}</span>
                  </div>
                  <div>
                    <FaMoneyCheckAlt className="inline text-xl" />
                    <span className=" ml-2 para">{e.price}</span>
                  </div>

                  <div className="">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setModal(true), setActiveID(id);
                      }}
                      className="btn bg-green-500 text-white hover:bg-green-600"
                    >
                      <FiEdit />
                      EDIT
                    </button>
                    <button
                      onClick={() => {
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

                                const response = await axios.delete(
                                  "https://ground-reservation-apis-production.up.railway.app/api/admin/ground/" +
                                    id,
                                  config
                                );
                                if (response.status == 200) {
                                  Successnotify();
                                }
                                console.log(response);
                              } catch (error) {
                                console.error(error);
                              }
                            };

                            deleteData();
                          }
                        });
                      }}
                      className="btn bg-red-400 text-white hover:bg-red-500 ml-4"
                    >
                      <FiTrash />
                      Delete
                    </button>
                    <Link to={`/manageGround/details/${e._id}`}>
                      <button className="btn bg-blue-500 text-white hover:bg-blue-600 ml-4">
                        <FiInfo />
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Admin_ManageGroundComponent;
