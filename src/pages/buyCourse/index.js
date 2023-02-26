import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Cookies from "js-cookie";
import "./styles.css";
import axios from "axios";
import VideoPlayer from "../../components/videoPlayer";
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
    axios
      .get(
        `${process.env.REACT_APP_URL}practice-course/v1/checkout-session/${data._id}`,config
      )
      .then((res) => {
        window.location = res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
      
  }
  async function getData() {
     const config = {
      headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
    };
    axios
      .get(`${process.env.REACT_APP_URL}practice-course/v1/course/${params}`,config)
      .then((res) => {
        setData(res.data.data.val);
      });
  }

  return (
    <div className="container">
      <img
        style={{ maxHeight: "30rem", maxWidth: "30rem" }}
        src={`${process.env.REACT_APP_URL}${data.photo}`}
        crossorigin="anonymous"
      />
      <h3>{data.name}</h3>
      <p>{data.summary}</p>
      <h2>Rs : {data.price}</h2>
      {!data.video && <Box className="ratingStar ">
        <Rating
          name="read-only"
          value={data.ratingsAverage}
          readOnly
          className="star"
        />
        <div className="ratingtotal">{data.ratingsQuantity}</div>
        {<button className="button" onClick={buyCourse}>
          Buy Now
        </button>}
      </Box>}
      {data.video && <VideoPlayer courseId={params} />}
    </div>
  );
};
export default BuyCourse;
