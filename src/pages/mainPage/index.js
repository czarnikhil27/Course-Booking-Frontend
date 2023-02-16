import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/courseCard";
import HeaderBar from "../../components/header";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./styles.css";
import { useSearchParams } from "react-router-dom";
import ImageForm from "../../components/form/index";
const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFiler] = useState("finance");
  const [courseId, setCourseId] = useState(searchParams.get("course"));
  const location = useLocation();
  const [course, setCourse] = useState([]);
  const [token, setToken] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
    };
    console.log("line22called");
    axios
      .get(
        `http://localhost:8080/practice-course/v1/course?filter=subject_${filter}`,
        config
      )
      .then((response) => {
        setCourse(response.data);
        console.log(course);
      });
  }, [filter]);
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="container">
      <HeaderBar course={course} setCourse={setCourse} setFiler={setFiler} />
      <CourseCard course={course} setCourse={setCourse} />
      {/* <ImageForm></ImageForm> */}
    </div>
  );
};
export default MainPage;
