import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function GroundRegistrationComponent() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [inputValues, setInputValues] = useState({
    name: "",
    location: "",
    pricing: "",
    description: "",
  });

  const notify = () => toast.success("Ground Registered!");
  const notifyError = () => toast.error("Something went wrong, try again!");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(selectedFile);
  const handleSubmission = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", inputValues.name);
    formData.append("location", inputValues.location);
    formData.append("description", inputValues.description);
    formData.append("price", inputValues.pricing);
    //input data
    const requestData = {
      image: selectedFile,
      name: inputValues.name,
      location: inputValues.location,
      description: inputValues.description,
      price: inputValues.pricing,
    };

    // Bearer token value
    const bearerToken = localStorage.getItem("token");

    // API endpoint URL
    const apiUrl =
      "https://ground-reservation-apis-production.up.railway.app/api/admin/ground";

    // Set the request headers with the Bearer token
    const headers = {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "multipart/form-data",
    };

    // Make the POST request with Axios
    axios
      .post(apiUrl, formData, { headers })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          notify();
        } else {
          notifyError();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="w-full p-12 bg-gray-50  content  transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
      <div>
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
        <h2 className="para text-2xl text-center mt-12">
          Fill form to register an ground
        </h2>
        {/* <img
          src="https://static.vecteezy.com/system/resources/thumbnails/017/223/073/small/nauru-map-grass-and-ground-map-texture-3d-illustration-png.png"
          className="w-28 block m-auto"
          alt=""
        /> */}

        <form
          action=""
          className="bg-white p-8 rounded-md w-1/2 m-auto mt-6  shadow-md"
        >
          <label htmlFor="" className="block">
            Select ground picture
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full max-w-xs"
          />

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
            onClick={handleSubmission}
            className="btn bg-green-500 block m-auto mt-12 shadow-lg text-white hover:bg-green-600"
          >
            Add Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default GroundRegistrationComponent;
