import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [loading, setLoading] = useState(false);

  let formData = new FormData();
  formData.append("image", image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        setUploadImage(response.data);
      }
    } catch (error) {
      console.log("error in upload->", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          📸 Multer Photo Upload
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
          encType="multipart/form-data"
        >
          <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-100 text-gray-600 rounded-lg shadow-md tracking-wide border border-dashed border-gray-300 cursor-pointer hover:bg-gray-200">
            <svg
              className="w-10 h-10 text-gray-500 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-9 4h6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">Select an image</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <button
            type="submit"
            disabled={!image || loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold shadow-md transition duration-300"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        <div className="mt-6">
          {uploadImage ? (
            <div>
              <h2 className="text-lg font-medium text-gray-700 mb-3">
                Uploaded Image:
              </h2>
              <img
                src={`http://localhost:3000/${uploadImage}`}
                alt="uploaded"
                className="rounded-lg shadow-md border w-full max-h-64 object-cover"
              />
            </div>
          ) : (
            <p className="text-gray-500">No image uploaded yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
