import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const imageUrl = "";
const CourseCard = (props) => {
  const { course } = props;
  const navigate = useNavigate();
  async function handleCourseClick(e) {
    navigate(`/${e.currentTarget.id}`);
    console.log(e.currentTarget);
  }
  return (
    <div className="all-box">
      {course.data?.map((data, index) => (
        <div className="box" id={`${data._id}`} onClick={handleCourseClick} key={index}>
          <div className="cardPhoto ">
            <img
              style={{ height: "10rem", width: "10rem" }}
              src={`http://localhost:8080/${data.photo}`}
              crossorigin="anonymous"
            />
          </div>
          <div className="cardInfo">
            <div className="cardHeaderText">{data.name}</div>
            <div className="authorText">{data.instructor}</div> 
            <div className="rating">
              <Box className="ratingStar ">
                <Rating
                  name="read-only"
                  value={data.ratingsAverage}
                  readOnly
                  className="star"
                />
                <span className="ratingtotal">{data.ratingsQuantity}</span>
              </Box>
            </div>
            <div className="cardHeaderText price">{data.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CourseCard;
