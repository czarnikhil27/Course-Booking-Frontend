import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Cookies from "js-cookie";
import "./styles.css";
import axios from "axios";
import { maxHeight } from "@mui/system";
const BuyCourse = () => {
  const [params, setParams] = useState(useParams().id);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, [params]);
  async function buyCourse() {
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
    };
    console.log(data._id);
    axios
      .get(
        `http://localhost:8080/practice-course/v1/checkout-session/${data._id}`,config
      )
      .then((res) => {
        console.log(res.data.url);
        window.location = res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
      
  }
  async function getData() {
    axios
      .get(`http://localhost:8080/practice-course/v1/course/${params}`)
      .then((res) => {
        console.log(res.data.data.val);
        setData(res.data.data.val);
      });
  }

  return (
    <div className="container">
      <img
        style={{ maxHeight: "30rem", maxWidth: "30rem" }}
        src={`http://localhost:8080/${data.photo}`}
        crossorigin="anonymous"
      />
      <h3>{data.name}</h3>
      <p>{data.summary}</p>
      <h2>Rs : {data.price}</h2>
      <Box className="ratingStar ">
        <Rating
          name="read-only"
          value={data.ratingsAverage}
          readOnly
          className="star"
        />
        <div className="ratingtotal">{data.ratingsQuantity}</div>
        <button className="button" onClick={buyCourse}>
          Buy Now
        </button>
      </Box>
    </div>
  );
};
export default BuyCourse;
