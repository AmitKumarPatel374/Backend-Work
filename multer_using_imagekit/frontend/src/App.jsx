import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [images, setImages] = useState([]); // ✅ changed: now an array for multiple files
  const [uploadedURLs, setUploadedURLs] = useState([]); // ✅ changed: store array of URLs

  
  let formData = new FormData();

  images?.map((elem) => {
    formData.append("image", elem);
  });

  console.log(formData);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        setUploadedURLs(response.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Error in uploading ->", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Images to ImageKit</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} /> 
        {/* ✅ changed: added multiple */}
        <button type="submit">Upload</button>
      </form>

      <div>
        {uploadedURLs
          ? uploadedURLs.map((elem, index) => (
            <img key={index} src={`${elem}`} alt="image here" />
          ))
          : "No images uploaded!"}
      </div>
    </div>
  );
};

export default App;
