import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const imageUrl = "";
const CourseCard = (props) => {
  const { course, bought } = props;
  const navigate = useNavigate();
  async function handleCourseClick(e) {
    navigate(`/${e.currentTarget.id}`);
  }
  return (
    <div className="all-box">
      {course.data?.map((data, index) => (
        <div
          className="box"
          id={`${data._id}`}
          onClick={handleCourseClick}
          key={index}
        >
          <div className="cardPhoto ">
            <img
              style={{ height: "10rem", width: "10rem" }}
              src={`${process.env.REACT_APP_URL}${data.photo}`}
              crossorigin="anonymous"
            />
          </div>
          <div className="cardInfo">
            <div className="cardHeaderText">{data?.name}</div>
            <div className="authorText">{data.instructor.name}</div>
            {bought && (
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
            )}
            {bought && <div className="cardHeaderText price">{data.price}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};
export default CourseCard;
