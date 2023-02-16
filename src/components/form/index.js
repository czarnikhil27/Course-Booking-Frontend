import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const ImageForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
    };
    axios
      .get(
        "http://localhost:8080/practice-course/v1/course/get-category",
        config
      )
      .then((response) => {
        setCategory(response.data);
      });
  }, []);
  const [data, setData] = useState({
    name: "",
    instructor: "finance",
    category: "finance",
    price: "",
    summary: "fdfdfdf",
  });
  const onDataChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setData((prev) => {
      const newData = { ...prev };
      newData[name] = value;
      return { ...newData };
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    console.log("line44")
    console.log(event.target.files[0]);
    setSelectedVideo(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("video", selectedVideo);
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("summary", data.summary);
    console.log(selectedVideo)
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
      };
      const response = await axios.post(
        "http://localhost:8080/practice-course/v1/course/create-course/63e3d46bb3eab50222c106e1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("Token")}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={onDataChange} />
      <select name="category" onChange={onDataChange}>
        {category.data?.map((val, index) => (
          <option value={val}>{val}</option>
        ))}
      </select>
      <input type="text" name="price" onChange={onDataChange} />
      <input type="text" name="summary" onChange={onDataChange} />
      <input type="file" onChange={handleFileChange} />
      <input type="file" onChange={handleVideoChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImageForm;
