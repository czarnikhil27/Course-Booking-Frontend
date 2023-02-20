import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderBar from "../header";
import { useNavigate } from "react-router-dom";
const ImageForm = () => {
  const navigate = useNavigate()
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
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
      };
      const response = await axios.post(
        "http://localhost:8080/practice-course/v1/course/create-course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("Token")}`,
          },
        }
      ).then((res)=>{
        if(res.status===200){
          navigate('/my-courses')
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <HeaderBar />
    <form onSubmit={handleSubmit}>
      <label for="email">
        <b>Name</b>
      </label>
      <input type="text" name="name" onChange={onDataChange} />
      <label for="email">
        <b>Category</b>
      </label>
      <select name="category" onChange={onDataChange}>
        {category.data?.map((val, index) => (
          <option value={val}>{val}</option>
        ))}
      </select>
      <label for="email">
        <b>Price</b>
      </label>
      <input type="text" name="price" onChange={onDataChange} />
      <label for="email">
        <b>Summary</b>
      </label>
      <input type="text" name="summary" onChange={onDataChange} />
      <label for="email">
        <b>Image</b>
      </label>
      <input type="file" onChange={handleFileChange} />
      <label for="email">
        <b>Video</b>
      </label>
      <input type="file" onChange={handleVideoChange} />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ImageForm;
