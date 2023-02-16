import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/courseCard";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import HeaderBar from '../../components/header'
import "./styles.css";
const MyCourses = () => {  
  const [course, setCourse] = useState([]);
  const[filer,setFiler] = useState('finance');
  const [token, setToken] = useState([]);

  useEffect(() => {
    const a = new URLSearchParams(window.location);
    console.log(a);
    
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
    };
    axios
      .get(
        `http://localhost:8080/practice-course/v1/course/user-courses`,
        config
      )
      .then((response) => {
      console.log(response.data)
       setCourse(response.data)
       setCourse(response.data)
       console.log(course)
      });
  }, []);
  return (
    <div className="container">
      <h1>Courses</h1>
      <HeaderBar course={course} setCourse={setCourse} setFiler={setFiler}/>
      <CourseCard course={course} />
      {/* <ImageForm></ImageForm> */}
    </div>
  );
};
export default MyCourses;
